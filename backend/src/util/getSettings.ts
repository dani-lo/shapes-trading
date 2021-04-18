import { existsSync, readFileSync } from 'fs'

interface settings {
  CLIENT_FACING_PORT: number;
  MONGO_URL: string;
}

const defaults: settings = {
  CLIENT_FACING_PORT: 7000,
  MONGO_URL: "mongodb://localhost:27017/shapes-trading",
}

const devConfig = existsSync("./config.json") && process.env.NODE_ENV != "production"
  ? JSON.parse(readFileSync("./config.json").toString())
  : {}

const env = process.env

/**
 * # validate settings if we're in production
 * 
 * Check that process.env has all the settings we'd expect. crash the process if
 * anything is missing.
 * 
 */
if (process.env.NODE_ENV == "production") {
  for (const key in defaults) {
    if (process.env[key] == null) throw new Error(`
    You are trying to run this service in production, but required setting "${key}" is not present in the environment.

    Check get-settings.ts for more information on why this might be happening,
    and to see which settings you might be missing

    Service settings should be exported to the environment for this process.
    `)
  }
}

var handler = {
  get (_target: {}, prop: keyof settings) {
    return env[prop] || devConfig[prop] || defaults[prop]
  }
}

const settings = new Proxy({}, handler) as settings


export default settings