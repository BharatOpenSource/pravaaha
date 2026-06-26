import * as path from 'path'
import * as readline from 'readline'
import simpleGit from 'simple-git'
import { parseProcessFile, processFileExists, validateSchema } from '../lib/schema'
import { validateSemantics } from '../lib/process'
import { hashFile } from '../lib/hash'
import { appendPil } from '../lib/pil'
import { header, pass, fail, info, section, blank } from '../lib/output'
import chalk from 'chalk'

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise(resolve => {
    rl.question(question, answer => { rl.close(); resolve(answer.trim()) })
  })
}

export async function publishCommand(filePath?: string): Promise<void> {
  const target = path.resolve(filePath ?? 'process.yaml')
  const repoRoot = path.dirname(target)

  header('pravaaha publish')

  if (!processFileExists(target)) {
    fail(`File not found: ${target}`)
    process.exit(1)
  }

  // ── Validate first ─────────────────────────────────────────────────────
  section('Pre-publish validation')
  let doc: unknown
  try {
    doc = parseProcessFile(target)
  } catch (e: unknown) {
    fail(`Failed to parse YAML: ${e instanceof Error ? e.message : String(e)}`)
    process.exit(1)
  }

  const schemaErrors = validateSchema(doc)
  if (schemaErrors.length > 0) {
    for (const e of schemaErrors) fail(`${e.path}: ${e.message}`)
    fail('Schema validation failed — fix errors before publishing')
    process.exit(1)
  }

  const { process: proc } = doc as ReturnType<typeof parseProcessFile>
  const semanticErrors = validateSemantics(proc).filter(e => e.type === 'error')
  if (semanticErrors.length > 0) {
    for (const e of semanticErrors) fail(e.message)
    fail('Semantic validation failed — fix errors before publishing')
    process.exit(1)
  }

  pass(`Process valid: ${chalk.bold(proc.id)} v${proc.version}`)

  // ── Confirmation ───────────────────────────────────────────────────────
  section('Confirmation required')
  info(`You are about to seal version ${chalk.bold(proc.version)} of ${chalk.bold(proc.name)}`)
  info(`Visibility: ${chalk.bold(proc.visibility)} | VPA tier: ${chalk.bold(proc.owner.vpa_tier ?? 'unverified')}`)
  blank()

  const confirm = await prompt(chalk.yellow('  Confirm publish? Type YES to proceed: '))
  if (confirm !== 'YES') {
    info('Publish cancelled.')
    process.exit(0)
  }

  const sealer = await prompt(chalk.yellow('  Sealer identity (your name or ID): '))
  if (!sealer) {
    fail('Sealer identity is required.')
    process.exit(1)
  }

  // ── Hash and record ────────────────────────────────────────────────────
  section('Sealing')
  const hash = hashFile(target)
  pass(`SHA-256: ${chalk.dim(hash)}`)

  const entry = {
    version: proc.version,
    hash,
    sealedAt: new Date().toISOString(),
    processId: proc.id,
    sealer,
  }

  appendPil(repoRoot, entry)
  pass(`Recorded to local PIL (.pravaaha/pil.json)`)

  // ── Git tag ────────────────────────────────────────────────────────────
  const git = simpleGit(repoRoot)
  const tagName = `v${proc.version}`

  try {
    const status = await git.status()
    if (!status.isClean()) {
      info('Working tree has uncommitted changes — committing process.yaml before tagging')
      await git.add(target)
      await git.commit(`Seal process ${proc.id} v${proc.version}\n\nSHA-256: ${hash}\nSealer: ${sealer}`)
      pass('Committed')
    }
    await git.addTag(tagName)
    pass(`Git tag created: ${chalk.bold(tagName)}`)
  } catch (e: unknown) {
    fail(`Git operation failed: ${e instanceof Error ? e.message : String(e)}`)
    info('PIL entry recorded — run git tag manually if needed')
  }

  blank()
  console.log(chalk.green.bold(`  ✓ Version ${proc.version} sealed.`))
  info(`Push the tag: ${chalk.bold(`git push origin ${tagName}`)}`)
  blank()
}
