import { Request, Response } from "express"
import fs from 'fs'

import { pyEngineCall } from '@util/pyEngineCall'

export const tickersMatch = (req : Request, res: Response) => {
  const data = req.body

  const { settings } = data 

  let matches : {[idx : number] : string} = {}
  let fetched = 0

  const pricesFolder = `${ __dirname}/../../../../st_engine/historical_prices`
  const tickerFiles = fs.readdirSync(pricesFolder)

  const from_ticker_file = tickerFiles.find(f => f.indexOf(settings.from_ticker) === 0)
  
  console.log('---- START TRAVERSING ---')
  settings.to_ticker.forEach((to_ticker : string, i : number) => {

    (function(i) {

      matches[i] = ''

      const to_ticker_file = tickerFiles.find(f => f.indexOf(to_ticker) === 0)
      const matchSettings = Object.assign({}, settings, {to_ticker: to_ticker, to_ticker_file, from_ticker_file})
      

      pyEngineCall('../st_engine/run_donchian.py', [ JSON.stringify(matchSettings) ], 
        function (dataBuffer : Buffer) {
          matches[i] += dataBuffer.toString()
        },
        function() {

          fetched++

          if (fetched === settings.to_ticker.length) {
            
            try {
              const fullMatch = Object.values(matches).reduce((acc, curr) => {

                const arrCurr = curr && curr.length > 0 ? JSON.parse(curr) : []
                return acc.concat(arrCurr)
              }, [])
              
              console.log('----- MATCH OK --- ')

              res.status(200).json({
                success: true,
                message: 'success',
                data: fullMatch
              })
            } catch (err) {
              console.log(err)
              res.status(200).json({
                success: false,
                message: 'error parsing match json',
                data: []
              })
            }
            
          }
        }
      )
    })(i)
  })
  
} 