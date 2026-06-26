import Ajv2020 from 'ajv/dist/2020'
import * as yaml from 'js-yaml'
import * as fs from 'fs'
import * as path from 'path'
import type { ProcessFile } from '../types/process'

const ajv = new Ajv2020({ allErrors: true })

let _schema: object | null = null

function loadSchema(): object {
  if (_schema) return _schema
  const schemaPath = path.resolve(__dirname, '../../schema/process.schema.json')
  _schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
  return _schema!
}

export interface SchemaError {
  path: string
  message: string
}

export function validateSchema(doc: unknown): SchemaError[] {
  const validate = ajv.compile(loadSchema())
  const valid = validate(doc)
  if (valid) return []
  return (validate.errors ?? []).map(e => ({
    path: e.instancePath || '(root)',
    message: e.message ?? 'unknown error',
  }))
}

export function parseProcessFile(filePath: string): ProcessFile {
  const content = fs.readFileSync(filePath, 'utf8')
  return yaml.load(content) as ProcessFile
}

export function processFileExists(filePath: string): boolean {
  return fs.existsSync(filePath)
}
