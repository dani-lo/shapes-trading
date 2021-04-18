import { stApp } from "./app"
import settings from './util/getSettings'

const clientFacingPort = settings.CLIENT_FACING_PORT

// start the client-facing server on the given port
const clientFacingServer = stApp.listen(clientFacingPort, function() {
  const err = arguments[0]
  if (err) {
    return console.error(err)
  } else {
    return console.log(`client-facing server is listening on ${clientFacingPort}`)
  }
})

export {
  clientFacingServer
}