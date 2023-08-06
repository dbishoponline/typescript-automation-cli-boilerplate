const logging = false // enable or disable logging in console
const debug = false // enable or disable debug mode
const display_errors = false // enable or disable display errors in console

const config = {
  logging,
  debug,
  display_errors,

  logger: {
    styles: ['bgGreenBright', 'bgCyan', 'bgMagenta', 'bgYellowBright', 'bgRedBright'],
  },

  interval_seconds: 10,
  number_of_screenshots: 8640,
}

export default config