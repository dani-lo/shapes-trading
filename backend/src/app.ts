import express from "express"
import bodyParser from "body-parser"
import clientRoutes from './routes/clientRoutes'

import { awaitMongoConnection } from "./util/mongoSetup"

// we'll use Express's server
const stApp = express()

const middlewareStack = [
  bodyParser.json(),
  awaitMongoConnection
]

stApp.use(...middlewareStack)
stApp.use(clientRoutes)              

// TS-node+nodemon is known to inconsistently kill child processes. fixed:
process.on('SIGINT', () => { console.log('arrivederci'); process.exit(); })

export {
  stApp
}
