import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const PROJECT_ROOT = process.cwd()
const ENV_FILE = path.join(PROJECT_ROOT, '.env')

const VALID_OWNERS = new Set(['kelvin', 'ayush', 'carl', 'johnathan', 'james', 'rahul'])

const NEON_API_KEY = process.env.NEON_API_KEY
const NEON_PROJECT_ID = process.env.NEON_PROJECT_ID

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

function getCurrentGitBranch() {
  // GitHub Actions PRs
  if (process.env.GITHUB_HEAD_REF) return process.env.GITHUB_HEAD_REF

  // GitHub Actions push events
  if (process.env.GITHUB_REF_NAME) return process.env.GITHUB_REF_NAME

  // Manual override if needed
  if (process.env.GIT_BRANCH) return process.env.GIT_BRANCH

  // Local fallback
  return run('git', ['rev-parse', '--abbrev-ref', 'HEAD'])
}

function getTargetNeonBranch(gitBranch) {
  if (gitBranch === 'main') return 'production'

  const owner = gitBranch.split('-')[0].toLowerCase()
  if (VALID_OWNERS.has(owner)) return owner

  return 'production'
}

function neonArgs(args) {
  const fullArgs = [...args]

  if (NEON_PROJECT_ID) {
    fullArgs.push('--project-id', NEON_PROJECT_ID)
  }

  if (NEON_API_KEY) {
    fullArgs.push('--api-key', NEON_API_KEY)
  }

  return fullArgs
}

function getExistingNeonBranches() {
  const raw = run('npx', neonArgs(['neonctl', 'branches', 'list', '--output', 'json']))
  const branches = JSON.parse(raw)
  return branches.map((b) => b.name)
}

function ensureNeonBranchExists(branchName) {
  const existing = getExistingNeonBranches()

  if (existing.includes(branchName)) {
    return
  }

  console.log(`[neon-sync] Creating Neon branch: ${branchName}`)

  execFileSync(
    'npx',
    neonArgs(['neonctl', 'branches', 'create', '--name', branchName, '--parent', 'production']),
    {
      cwd: PROJECT_ROOT,
      stdio: 'inherit',
    },
  )
}

function getConnectionString(branchName) {
  return run(
    'npx',
    neonArgs(['neonctl', 'connection-string', branchName, '--role-name', 'neondb_owner']),
  )
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

function updateEnvFile(connectionString, neonBranch, gitBranch) {
  ensureEnvFileExists()

  let content = fs.readFileSync(ENV_FILE, 'utf8')
  content = upsertEnvVar(content, 'DATABASE_URL', connectionString)
  content = upsertEnvVar(content, 'NEON_BRANCH', neonBranch)
  content = upsertEnvVar(content, 'GIT_BRANCH', gitBranch)

  fs.writeFileSync(ENV_FILE, content, 'utf8')
}

function main() {
  const gitBranch = getCurrentGitBranch()
  const neonBranch = getTargetNeonBranch(gitBranch)

  if (!NEON_API_KEY) {
    console.warn('[neon-sync] NEON_API_KEY is not set.')
    console.warn('[neon-sync] Falling back to local Neon CLI auth if available.')
  }

  if (!NEON_PROJECT_ID) {
    console.warn('[neon-sync] NEON_PROJECT_ID is not set.')
    console.warn('[neon-sync] Neon CLI must already have a project context, or commands may fail.')
  }

  ensureNeonBranchExists(neonBranch)
  const connectionString = getConnectionString(neonBranch)
  updateEnvFile(connectionString, neonBranch, gitBranch)

  console.log(`[neon-sync] ${gitBranch} -> ${neonBranch}`)
  console.log('[neon-sync] Updated .env')
  console.log('[neon-sync] Restart dev server if it is already running')
}

main()