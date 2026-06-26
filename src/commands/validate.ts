import * as path from 'path'
import { parseProcessFile, processFileExists, validateSchema } from '../lib/schema'
import { validateSemantics } from '../lib/process'
import { pass, fail, warn, header, section, blank, info } from '../lib/output'
import chalk from 'chalk'

export function validateCommand(filePath?: string): void {
  const target = path.resolve(filePath ?? 'process.yaml')

  header(`pravaaha validate`)
  info(`Reading ${chalk.dim(target)}`)

  if (!processFileExists(target)) {
    fail(`File not found: ${target}`)
    process.exit(1)
  }

  let doc: unknown
  try {
    doc = parseProcessFile(target)
  } catch (e: unknown) {
    fail(`Failed to parse YAML: ${e instanceof Error ? e.message : String(e)}`)
    process.exit(1)
  }

  // ── Schema validation ──────────────────────────────────────────────────
  section('Schema')
  const schemaErrors = validateSchema(doc)
  if (schemaErrors.length === 0) {
    pass('Valid against process schema')
  } else {
    for (const e of schemaErrors) {
      fail(`${e.path}: ${e.message}`)
    }
  }

  if (schemaErrors.length > 0) {
    blank()
    fail(`Schema validation failed — fix ${schemaErrors.length} error(s) above before semantic checks`)
    process.exit(1)
  }

  const { process: proc } = doc as { process: ReturnType<typeof parseProcessFile>['process'] }

  // ── Process overview ───────────────────────────────────────────────────
  section('Process')
  pass(`id: ${chalk.bold(proc.id)}`)
  pass(`version: ${chalk.bold(proc.version)}`)
  pass(`visibility: ${chalk.bold(proc.visibility)}`)
  pass(`vpa_tier: ${chalk.bold(proc.owner.vpa_tier ?? 'unverified')}`)
  pass(`parties: ${proc.parties.length}`)
  pass(`steps: ${proc.steps.length}`)
  pass(`rights: ${(proc.rights ?? []).length}`)
  pass(`references: ${(proc.references ?? []).length}`)

  // ── Semantic validation ────────────────────────────────────────────────
  section('Semantics')
  const semanticResults = validateSemantics(proc)
  const errors = semanticResults.filter(e => e.type === 'error')
  const warnings = semanticResults.filter(e => e.type === 'warning')

  if (errors.length === 0 && warnings.length === 0) {
    pass('All steps reachable, all references resolve, all actors defined')
  }
  for (const e of errors) fail(e.message)
  for (const w of warnings) warn(w.message)

  // ── Result ─────────────────────────────────────────────────────────────
  blank()
  if (errors.length > 0) {
    console.log(chalk.red.bold(`  ${errors.length} error(s) found. Process is not publishable.`))
    process.exit(1)
  } else if (warnings.length > 0) {
    console.log(chalk.yellow.bold(`  ${warnings.length} warning(s). Process is valid but review recommended.`))
  } else {
    console.log(chalk.green.bold('  ✓ Process is valid and ready to publish.'))
  }
  blank()
}
