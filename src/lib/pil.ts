import * as fs from 'fs'
import * as path from 'path'

const PIL_DIR = '.pravaaha'
const PIL_FILE = 'pil.json'

export interface PilEntry {
  version: string
  hash: string
  sealedAt: string
  processId: string
  sealer: string
}

function pilPath(repoRoot: string): string {
  return path.join(repoRoot, PIL_DIR, PIL_FILE)
}

export function readPil(repoRoot: string): PilEntry[] {
  const p = pilPath(repoRoot)
  if (!fs.existsSync(p)) return []
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}

export function appendPil(repoRoot: string, entry: PilEntry): void {
  const dir = path.join(repoRoot, PIL_DIR)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  const existing = readPil(repoRoot)
  existing.push(entry)
  fs.writeFileSync(pilPath(repoRoot), JSON.stringify(existing, null, 2), 'utf8')
}

export function findVersion(repoRoot: string, version: string): PilEntry | undefined {
  return readPil(repoRoot).find(e => e.version === version)
}
