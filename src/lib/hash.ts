import * as crypto from 'crypto'
import * as fs from 'fs'

export function hashFile(filePath: string): string {
  const content = fs.readFileSync(filePath)
  return crypto.createHash('sha256').update(content).digest('hex')
}

export function hashString(content: string): string {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex')
}
