import { Router } from "express"
import cors from "cors"

import { priceSeries , priceSeriesWithIndicators} from '@routes/handlers/priceSeries'
import { tickersMatch } from '@routes/handlers/tickersMatch'
import { tickersAvilable } from '@routes/handlers/tickersAvilable'
import { tickersRefresh}  from '@routes/handlers/tickersRefresh'
import { saveMatch } from '@routes/handlers/saveMatch'
import { removeMatch } from '@routes/handlers/removeMatch'
import { fetchMatches } from '@routes/handlers/fetchMatches'
import { showhideMatch } from '@routes/handlers/showhideMatch'
import { saveMatchOptions } from '@routes/handlers/saveMatchOptions'
import { fetchMatchOptions } from '@routes/handlers/fetchMatchOptions'
import { showhideMatchOption } from '@routes/handlers/showhideMatchOption'

const clientRoutes = Router()

const corsOptions = {
  origin: '*', // @TODO — let's dynamically set this to be the dashboard app 
               //         URL, and bin requests that come from anywhere else

  optionsSuccessStatus: 204 // set this to 200 if you run into trouble with 
                            // legacy browsers
}

/**
 * # Set up CORS handling for these routes
 */
clientRoutes.use(cors(corsOptions))

clientRoutes.get(
  "/available-tickers",
  tickersAvilable
)

clientRoutes.get(
  "/price-series/:ticker/:from/:to/:bpad/:fpad", 
  priceSeries
)
clientRoutes.post(
  "/match", 
  tickersMatch
)

clientRoutes.post(
  "/price-series-indicators",
  priceSeriesWithIndicators
)
clientRoutes.post(
  "/save-match", 
  saveMatch
)
clientRoutes.post(
  "/remove-saved-match", 
  removeMatch
)
clientRoutes.post(
  "/save-match-options", 
  saveMatchOptions
)

clientRoutes.post(
  "/refresh-tickers", 
  tickersRefresh
)

clientRoutes.post(
  "/showhide-match", 
  showhideMatch
)

clientRoutes.post(
  "/showhide-match-option", 
  showhideMatchOption
)

clientRoutes.get(
  '/matches',
  fetchMatches
)

clientRoutes.get(
  '/match-options',
  fetchMatchOptions
)

export default clientRoutes
