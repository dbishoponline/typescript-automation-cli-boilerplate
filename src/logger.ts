import Table from 'cli-table'
import chalk from 'chalk'
import config from './config'

const rainbow = (i, x) => chalk.black[config.logger.styles[i]].bold(x)

const logger = {

  // info message in console log (incase differentiation between `log` and `info` is required)
  info: (label = "", ...arr) => {
    if (config.logging) {
      console.log(chalk.white.bgBlue.bold(label, ...arr))
    }
    return arr
  },

  // trace message in console log
  trace: (label = "", ...arr) => {
    if (config.logging) {
      console.log(chalk.white.bgGreen.bold(label, ...arr))
    }
    return arr
  },

  debugger: (label = "", ...arr) => {
    if (config.logging && config.debug) {
      console.log(chalk.white.bgBlue.bold(label, ...arr))
    }
    return arr
  },

  warn: (label = "", ...arr) => {
    if (config.logging) {
      console.log(chalk.white.bgYellow.bold(label, ...arr))
    }
    return arr
  },

  error: (label = "", ...arr) => {
    if (config.logging) {
      console.error(label, ...arr)
      console.log(chalk.white.bgRed.bold(label, ...arr))
    }
    return arr
  },

  msg: (label = "", ...arr) => {
    console.log(chalk.black.bgCyan.bold(label, ...arr))
    return arr
  },

  heading: (label = "", ...arr) => {
    console.log(
      chalk.black.bgYellowBright.bold(` ${label} `),
      chalk.black.bgBlueBright.bold(`${arr.reduce((acc, v) => `${acc} ${v}`, ``)} `)
    )
  },

  table: (label = "", config, arr) => {
    const table = new Table(config)

    arr.forEach((x) => {
      table.push([label, ...x])
    })

    console.log(table.toString())
  },



  stat: (label = "", ...arr) => {
    console.log(
      ' - ',
      chalk.black.bgBlackBright.bold(` ${label} `),
      ` ${arr.reduce((acc, v, i) => `${acc} ${rainbow(i, v)}`, ``)} `
      // arr.reduce((acc, v, i, arr2) => `${acc} ${chalk.black.bgGreenBright.bold(v)}`, ``)
    )
  },

  space: () => console.log(' '),
}

export default logger