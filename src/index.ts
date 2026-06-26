#!/usr/bin/env node
import { Command } from 'commander'
import { validateCommand } from './commands/validate'
import { initCommand } from './commands/init'
import { publishCommand } from './commands/publish'
import { diffCommand } from './commands/diff'

const program = new Command()

program
  .name('pravaaha')
  .description('Process registry toolchain — authored, versioned, auditable, forkable processes')
  .version('0.1.0')

program
  .command('init')
  .description('Scaffold a new process.yaml in the current directory')
  .argument('[output]', 'Output file path', 'process.yaml')
  .action((output: string) => initCommand(output))

program
  .command('validate')
  .description('Validate a process.yaml against the schema and semantic rules')
  .argument('[file]', 'Path to process.yaml', 'process.yaml')
  .action((file: string) => validateCommand(file))

program
  .command('publish')
  .description('Seal and record the current process version (requires confirmation)')
  .argument('[file]', 'Path to process.yaml', 'process.yaml')
  .action(async (file: string) => {
    await publishCommand(file)
  })

program
  .command('diff')
  .description('Show human-readable differences between two sealed versions')
  .argument('<from>', 'Git ref (tag or commit) of the earlier version')
  .argument('<to>', 'Git ref (tag or commit) of the later version')
  .option('-d, --dir <path>', 'Repository directory', '.')
  .action(async (from: string, to: string, opts: { dir: string }) => {
    await diffCommand(from, to, opts.dir)
  })

program.parse()
