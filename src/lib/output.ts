import chalk from 'chalk'

export function pass(msg: string) {
  console.log(chalk.green('  ✓') + ' ' + msg)
}

export function fail(msg: string) {
  console.log(chalk.red('  ✗') + ' ' + msg)
}

export function warn(msg: string) {
  console.log(chalk.yellow('  ⚠') + ' ' + msg)
}

export function info(msg: string) {
  console.log(chalk.cyan('  →') + ' ' + msg)
}

export function header(msg: string) {
  console.log('\n' + chalk.bold(msg))
}

export function section(msg: string) {
  console.log('\n' + chalk.dim('──') + ' ' + chalk.bold(msg))
}

export function blank() {
  console.log()
}
