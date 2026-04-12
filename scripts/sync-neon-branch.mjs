import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const PROJECT_ROOT = process.cwd()
const ENV_FILE = path.join(PROJECT_ROOT, '.env')

const VALID_OWNERS = new Set(['kelvin', 'ayush', 'carl', 'johnathan', 'james', 'rahul'])

function run(cmd, options = {}) {
  return execSync(cmd, {
    cwd: PROJECT_ROOT,
    stdio: ['pipe', 'pipe', 'pipe'],
    encoding: 'utf8',
    ...options,
  }).trim()
}

function getCurrentGitBranch() {
  return run('git rev-parse --abbrev-ref HEAD')
}

function getTargetNeonBranch(gitBranch) {
  if (gitBranch === 'main') return 'production'

  const owner = gitBranch.split('-')[0].toLowerCase()

  if (VALID_OWNERS.has(owner)) {
    return owner
  }

  return 'production'
}

function getExistingNeonBranches() {
  const raw = run('neon branches list --output json')
  const branches = JSON.parse(raw)
  return branches.map((b) => b.name)
}

function ensureNeonBranchExists(branchName) {
  const existing = getExistingNeonBranches()
  if (existing.includes(branchName)) return

  run(`neon branches create --name "${branchName}" --parent production`, {
    stdio: 'inherit',
  })
}

function getConnectionString(branchName) {
  return run(`neon connection-string "${branchName}"`)
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

  ensureNeonBranchExists(neonBranch)
  const connectionString = getConnectionString(neonBranch)
  updateEnvFile(connectionString, neonBranch, gitBranch)

  console.log(`[neon-sync] ${gitBranch} -> ${neonBranch}`)
  console.log('[neon-sync] Updated .env')
  console.log('[neon-sync] Restart dev server if it is already running')
}

main()
