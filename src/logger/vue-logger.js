import { createLogger } from 'vue-logger-plugin'
const isProduction = process.env.NODE_ENV === 'production'

export default function (context, inject) {
  const logger = createLogger({
    enabled: true,
    level: isProduction ? 'error' : 'debug',
    separator: '|',
    showConsoleColors: true,
  })

  inject('logger', logger)
}
