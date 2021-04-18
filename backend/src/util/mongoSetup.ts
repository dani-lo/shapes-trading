import express from "express"
import { MongoClient } from "mongodb"
import settings from './getSettings'

// process.env.MONGO_URL or MONGO_URL from config.js if you're localhost and don't
// want to mess with environment variables.
const mongoURL = settings.MONGO_URL

/**
 * The Mongo Connection
 *
 * This is a long-lived connection to your DB.
 *
 * The mongo driver will handle connection pooling and so on internally
 *
 * if you need to tune connection pool size, etc, you can pass a config object
 * to this setup function after the url
 *
 * Docs here: https://mongodb.github.io/node-mongodb-native/3.3/api/MongoClient.html
 */
export const mongoClient = new MongoClient(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

/**
 * # Express middleware to pause requests until the DB is ready
 *
 * This is an express middleware that ensure the DB Connection is ready before
 * passing the request forwards to the next handler. You can use this at the app
 * level, or with any specific Router() block to make sure mongo is available
 * 
 * We implement this as middleware, rather than doing it during application boot
 * so that the app will be up and ready to receive requests as soon as the
 * process starts — the first request will be handled more slowly, but
 * we'll have great service availability.
 * 
 * We also get resilience to DB connections being dropped, because if they fail,
 * this middleware will re-establish them for us on the next request
 */
export const awaitMongoConnection: express.Handler = async function(
  req,
  res,
  next
) {
  if (mongoClient.isConnected()) {
    next()
  } else {
    try {
      await mongoClient.connect()
      next()
    } catch (e) {
      res.status(500)
      res.send("Could not connect to mongo")
    }
  }
}

export function getDB() {
  if (!mongoClient.isConnected())
    throw new Error("You cannot get the DB before the mongoClient is connected")
  return mongoClient.db()
}

// Bail out of any open connections the MongoClient holds if we get SIGINT
process.on("SIGINT", function() {
  mongoClient.close()
})
