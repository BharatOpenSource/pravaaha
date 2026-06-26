import * as fs from 'fs'
import * as path from 'path'
import { header, pass, fail, info, blank } from '../lib/output'
import chalk from 'chalk'

const TEMPLATE = `process:
  id: my-process
  name: My Process
  version: "1.0.0"
  owner:
    id: my-org
    name: My Organisation
    vpa_tier: unverified
  visibility: public
  change_lock_days: 14

  parties:
    - id: initiator
      role: Process Initiator
    - id: approver
      role: Approving Authority

  rights:
    - party: initiator
      right: Right to receive written reason for any rejection
      authority:
        law: Enter applicable law here
        section: "Enter section number"

  steps:
    - id: submit-request
      name: Submit Request
      actor: initiator
      action: Initiator submits request with required documents
      outputs: [request_document]
      next: review-request
      immutability: notice-required

    - id: review-request
      name: Review Request
      actor: approver
      action: Approver reviews request for completeness and validity
      conditions:
        - if: approved
          next: complete
        - if: rejected
          next: request-rejected
      immutability: notice-required

    - id: request-rejected
      name: Request Rejected
      actor: approver
      action: Approver communicates rejection with written reason
      outputs: [rejection_notice]
      loop_back: submit-request
      immutability: notice-required
      rights_reference: initiator.right[0]

    - id: complete
      name: Process Complete
      actor: approver
      action: Request approved and outcome communicated to initiator
      outputs: [approval_notice]
      terminal: true
      immutability: notice-required
`

export function initCommand(outputPath?: string): void {
  const target = path.resolve(outputPath ?? 'process.yaml')

  header('pravaaha init')

  if (fs.existsSync(target)) {
    fail(`${target} already exists. Will not overwrite.`)
    info('Delete the existing file or specify a different path.')
    process.exit(1)
  }

  fs.writeFileSync(target, TEMPLATE, 'utf8')
  pass(`Created ${chalk.bold(target)}`)
  blank()
  info(`Next steps:`)
  info(`  1. Edit process.yaml — fill in your process details`)
  info(`  2. Run ${chalk.bold('pravaaha validate')} to check for errors`)
  info(`  3. Run ${chalk.bold('pravaaha publish')} to seal and record this version`)
  blank()
}
