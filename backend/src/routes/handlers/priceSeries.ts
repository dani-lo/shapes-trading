import { Request, Response } from "express"
import fs from 'fs'
import moment from 'moment';

import { fileTicker } from "@util/fileTicker"
import { pyEngineCall } from '@util/pyEngineCall'

const StreamArray = require('stream-json/streamers/StreamArray');

export const priceSeries = (req : Request, res: Response) => {

  const pricesFolder = `${ __dirname}/../../../../st_engine/historical_prices`
  const files = fs.readdirSync(pricesFolder)
  
  const { ticker, from, to, bpad, fpad } = req.params 

  const paddedFrom = moment(from).subtract(Number(bpad) / 5 * 7, 'days').format('YYYY-MM-DD')
  const paddedTo = moment(to).add(Number(fpad) / 5 * 7, 'days').format('YYYY-MM-DD')

  const priceData : any = []

  let fileName = null

  files.forEach(fname => {
    const t = fileTicker(fname)

    if (t === ticker) {
      fileName = `${ pricesFolder }/${ fname }` 
    }
  })

  if (fileName) {
    const jsonStream = StreamArray.withParser();
    const stream : ReadableStream = fs.createReadStream(fileName).pipe(jsonStream.input)

    jsonStream.on('data', function ({key, value} : {key: string, value: {Date: string }}) {

      if (value.Date >= paddedFrom && value.Date <= paddedTo) {
        priceData.push(value)
      } 
      
    });
  
    jsonStream.on('end', () => {
  
      return res.status(200).json({
        success: true,
        message: 'success',
        data: priceData
      })
    })
  } else {
    return res.status(500).json({
      success: false,
      message: 'error reading price data'
    })
  }
}

export const priceSeriesWithIndicators = (req : Request, res: Response) => {
  const data = req.body

  const { settings } = data
  
  let prices = ''

  pyEngineCall('../st_engine/run_priceseries.py', [ JSON.stringify(settings) ], 
    function (dataBuffer : Buffer) {
      prices += dataBuffer.toString()
    },
    function() {
      try {

        prices = JSON.parse(prices)

        return res.status(200).json({
          success: true,
          message: 'success',
          data: prices
        })

      } catch (err) {
        res.status(200).json({
          success: false,
          message: 'error parsing match json',
          data: []
        })
      }
      
    })
  
  
  
}