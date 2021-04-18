import { Request, Response } from "express"
import fs from 'fs'

export const tickersAvilable = (req : Request, res: Response) => {
  
  const pricesFolder = `${ __dirname}/../../../../st_engine/historical_prices`
  const files = fs.readdirSync(pricesFolder)

  return res.status(200).json({
    success: true,
    message: 'success',
    data: files
  })
}