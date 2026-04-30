import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import nextEnv from '@next/env'

const { loadEnvConfig } = nextEnv

const PROJECT_ROOT = process.cwd()
loadEnvConfig(PROJECT_ROOT)

const ENV_FILE = path.join(PROJECT_ROOT, '.env')

const VALID_OWNERS = new Set(['kelvin', 'ayush', 'carl', 'johnathan', 'james', 'rahul'])

const NEON_API_KEY = process.env.NEON_API_KEY
const NEON_PROJECT_ID = process.env.NEON_PROJECT_ID

const AUTOPUSH_ENV_KEY = 'AUTOPUSH'

const NEONCTL_BIN = path.join(
  PROJECT_ROOT,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'neonctl.cmd' : 'neonctl',
)

function run(command, args = [], options = {}) {
  const result = execFileSync(command, args, {
    cwd: PROJECT_ROOT,
    stdio: ['pipe', 'pipe', 'pipe'],
    encoding: 'utf8',
    ...options,
  })

  if (typeof result === 'string') return result.trim()
  if (Buffer.isBuffer(result)) return result.toString('utf8').trim()
  return ''
}

function withNeonAuth(args) {
  const finalArgs = [...args]

  if (NEON_PROJECT_ID) {
    finalArgs.push('--project-id', NEON_PROJECT_ID)
  }

  if (NEON_API_KEY) {
    finalArgs.push('--api-key', NEON_API_KEY)
  }

  return finalArgs
}

function runNeon(args, options = {}) {
  const finalArgs = withNeonAuth(args)

  if (process.platform === 'win32') {
    return run('cmd.exe', ['/d', '/s', '/c', 'call', NEONCTL_BIN, ...finalArgs], options)
  }

  return run(NEONCTL_BIN, finalArgs, options)
}

function execNeon(args, options = {}) {
  const finalArgs = withNeonAuth(args)

  if (process.platform === 'win32') {
    return execFileSync('cmd.exe', ['/d', '/s', '/c', 'call', NEONCTL_BIN, ...finalArgs], {
      cwd: PROJECT_ROOT,
      ...options,
    })
  }

  return execFileSync(NEONCTL_BIN, finalArgs, {
    cwd: PROJECT_ROOT,
    ...options,
  })
}

function getCurrentGitBranch() {
  if (process.env.GITHUB_HEAD_REF) return process.env.GITHUB_HEAD_REF
  if (process.env.GITHUB_REF_NAME) return process.env.GITHUB_REF_NAME

  return run('git', ['rev-parse', '--abbrev-ref', 'HEAD'])
}

function getTargetNeonBranch(gitBranch) {
  if (gitBranch === 'main') return 'production'

  const owner = gitBranch.split('-')[0].toLowerCase()
  if (VALID_OWNERS.has(owner)) return owner

  return 'production'
}

function getExistingNeonBranches() {
  const raw = runNeon(['branches', 'list', '--output', 'json'])
  const branches = JSON.parse(raw)
  return branches.map((branch) => branch.name)
}

function ensureNeonBranchExists(branchName) {
  const existingBranches = getExistingNeonBranches()

  if (existingBranches.includes(branchName)) return

  console.log(`[neon-sync] Creating Neon branch: ${branchName}`)

  execNeon(['branches', 'create', '--name', branchName, '--parent', 'production'], {
    stdio: 'inherit',
  })
}

function resetNeonBranchFromParent(branchName) {
  if (branchName === 'production') {
    console.log('[neon-sync] Skipping reset because production should never be reset.')
    return
  }

  console.log(`[neon-sync] Resetting Neon branch "${branchName}" from its parent.`)

  execNeon(['branches', 'reset', branchName, '--parent'], {
    stdio: 'inherit',
  })
}

function getConnectionString(branchName) {
  return runNeon(['connection-string', branchName, '--role-name', 'neondb_owner'])
}

function upsertEnvVar(content, key, value) {
  const line = `${key}=${value}`
  const regex = new RegExp(`^${key}=.*$`, 'm')

  if (regex.test(content)) {
    return content.replace(regex, line)
  }

  const trimmed = content.trimEnd()
  return trimmed ? `${trimmed}\n${line}\n` : `${line}\n`
}

function ensureEnvFileExists() {
  if (!fs.existsSync(ENV_FILE)) {
    fs.writeFileSync(ENV_FILE, '', 'utf8')
  }
}

function updateEnvFile(connectionString, neonBranch, gitBranch, autopush) {
  ensureEnvFileExists()

  let content = fs.readFileSync(ENV_FILE, 'utf8')

  content = upsertEnvVar(content, 'DATABASE_URL', connectionString)
  content = upsertEnvVar(content, 'NEON_BRANCH', neonBranch)
  content = upsertEnvVar(content, 'GIT_BRANCH', gitBranch)
  content = upsertEnvVar(content, AUTOPUSH_ENV_KEY, String(autopush))

  fs.writeFileSync(ENV_FILE, content, 'utf8')
}

function ensureNeonCliExists() {
  if (!fs.existsSync(NEONCTL_BIN)) {
    throw new Error(
      `Neon CLI not found at ${NEONCTL_BIN}. Run "npm install" so the local neonctl binary is available.`,
    )
  }
}

async function askYesNo(question) {
  if (!process.stdin.isTTY) {
    console.log('[neon-sync] Non-interactive shell detected. Defaulting autopush=false.')
    return false
  }

  const rl = createInterface({ input, output })

  try {
    while (true) {
      const answer = await rl.question(`${question} (y/n): `)
      const normalised = answer.trim().toLowerCase()

      if (normalised === 'y' || normalised === 'yes') return true
      if (normalised === 'n' || normalised === 'no') return false

      console.log('[neon-sync] Please enter y or n.')
    }
  } finally {
    rl.close()
  }
}

async function getAutopushChoice(gitBranch, neonBranch) {
  if (gitBranch === 'main') {
    console.log('[neon-sync] Main branch detected. Setting autopush=false.')
    return false
  }

  console.log(`[neon-sync] Current git branch: ${gitBranch}`)
  console.log(`[neon-sync] Target Neon branch: ${neonBranch}`)

  const autopush = await askYesNo('Enable AUTO_PUSH for this branch?:')

  return autopush
}

async function main() {
  ensureNeonCliExists()

  const gitBranch = getCurrentGitBranch()
  const neonBranch = getTargetNeonBranch(gitBranch)

  if (!NEON_API_KEY) {
    console.log('[neon-sync] No NEON_API_KEY found, using local Neon CLI auth if available.')
  }

  if (!NEON_PROJECT_ID) {
    console.log(
      '[neon-sync] No NEON_PROJECT_ID found, using local Neon CLI project context if available.',
    )
  }

  ensureNeonBranchExists(neonBranch)

  const autopush = await getAutopushChoice(gitBranch, neonBranch)

  if (gitBranch !== 'main' && autopush === false) {
    resetNeonBranchFromParent(neonBranch)
  }

  const connectionString = getConnectionString(neonBranch)

  updateEnvFile(connectionString, neonBranch, gitBranch, autopush)

  console.log(`[neon-sync] ${gitBranch} -> ${neonBranch}`)
  console.log(`[neon-sync] ${AUTOPUSH_ENV_KEY}=${autopush}`)
  console.log('[neon-sync] Updated .env')
  console.log('[neon-sync] Restart dev server if it is already running')
}

main().catch((error) => {
  console.error('[neon-sync] Failed:', error.message)
  process.exit(1)
})
