import * as path from 'path'
import simpleGit from 'simple-git'
import * as yaml from 'js-yaml'
import { header, section, pass, fail, info, warn, blank } from '../lib/output'
import type { Process } from '../types/process'
import chalk from 'chalk'

async function getProcessAtRef(repoRoot: string, ref: string): Promise<Process | null> {
  const git = simpleGit(repoRoot)
  try {
    const content = await git.show(`${ref}:process.yaml`)
    const doc = yaml.load(content) as { process: Process }
    return doc.process
  } catch {
    return null
  }
}

function diffSteps(a: Process, b: Process): void {
  const aIds = new Map(a.steps.map(s => [s.id, s]))
  const bIds = new Map(b.steps.map(s => [s.id, s]))

  const added = [...bIds.keys()].filter(id => !aIds.has(id))
  const removed = [...aIds.keys()].filter(id => !bIds.has(id))
  const changed: string[] = []

  for (const [id, bStep] of bIds) {
    const aStep = aIds.get(id)
    if (!aStep) continue
    if (JSON.stringify(aStep) !== JSON.stringify(bStep)) changed.push(id)
  }

  if (added.length === 0 && removed.length === 0 && changed.length === 0) {
    pass('Steps: no changes')
    return
  }
  for (const id of added)   info(`Step added:   ${chalk.green(id)}`)
  for (const id of removed) info(`Step removed: ${chalk.red(id)}`)
  for (const id of changed) {
    const aStep = aIds.get(id)!
    const bStep = bIds.get(id)!
    info(`Step changed: ${chalk.yellow(id)}`)
    if (aStep.action !== bStep.action) {
      console.log(chalk.dim(`    action: "${aStep.action}" → "${bStep.action}"`))
    }
    if (aStep.immutability !== bStep.immutability) {
      console.log(chalk.dim(`    immutability: ${aStep.immutability} → ${bStep.immutability}`))
    }
    if (JSON.stringify(aStep.conditions) !== JSON.stringify(bStep.conditions)) {
      console.log(chalk.dim(`    conditions changed`))
    }
  }
}

function diffRights(a: Process, b: Process): void {
  const aRights = a.rights ?? []
  const bRights = b.rights ?? []
  if (JSON.stringify(aRights) === JSON.stringify(bRights)) {
    pass('Rights: no changes')
    return
  }
  if (bRights.length > aRights.length) {
    info(`Rights: ${chalk.green(`+${bRights.length - aRights.length} added`)}`)
  } else if (bRights.length < aRights.length) {
    warn(`Rights: ${chalk.red(`${aRights.length - bRights.length} removed`)} — verify legal authority`)
  } else {
    info('Rights: content changed — verify legal citations are current')
  }
}

function diffParties(a: Process, b: Process): void {
  const aIds = new Set(a.parties.map(p => p.id))
  const bIds = new Set(b.parties.map(p => p.id))
  const added = [...bIds].filter(id => !aIds.has(id))
  const removed = [...aIds].filter(id => !bIds.has(id))
  if (added.length === 0 && removed.length === 0) {
    pass('Parties: no changes')
    return
  }
  for (const id of added)   info(`Party added:   ${chalk.green(id)}`)
  for (const id of removed) warn(`Party removed: ${chalk.red(id)} — check step references`)
}

export async function diffCommand(fromRef: string, toRef: string, dirPath?: string): Promise<void> {
  const repoRoot = path.resolve(dirPath ?? '.')

  header('pravaaha diff')
  info(`${chalk.bold(fromRef)} → ${chalk.bold(toRef)}`)

  const [a, b] = await Promise.all([
    getProcessAtRef(repoRoot, fromRef),
    getProcessAtRef(repoRoot, toRef),
  ])

  if (!a) { fail(`Could not read process.yaml at ref '${fromRef}'`); process.exit(1) }
  if (!b) { fail(`Could not read process.yaml at ref '${toRef}'`); process.exit(1) }

  section('Overview')
  if (a.version !== b.version) info(`Version: ${chalk.dim(a.version)} → ${chalk.bold(b.version)}`)
  else pass(`Version: ${a.version} (unchanged)`)
  if (a.visibility !== b.visibility) warn(`Visibility: ${a.visibility} → ${b.visibility}`)
  if ((a.change_lock_days ?? 14) !== (b.change_lock_days ?? 14)) {
    info(`change_lock_days: ${a.change_lock_days ?? 14} → ${b.change_lock_days ?? 14}`)
  }

  section('Parties')
  diffParties(a, b)

  section('Rights')
  diffRights(a, b)

  section('Steps')
  diffSteps(a, b)

  blank()
}
