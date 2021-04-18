import { Request, Response } from "express"

import { pyEngineCall } from '@util/pyEngineCall'

export const tickersRefresh = (req : Request, res: Response) => {
  const { tickers } = req.body 

  let result : null |  {[ticker : string] : string} = null

  const onData = (dataBuffer : Buffer) => {
    
    const pyRes = JSON.parse(dataBuffer.toString())

    result = pyRes
  }

  const onEnd = () => {

    const success = result !== null && Object.keys(result).length === tickers.length && Object.values(result).every(strPath => strPath !== 'Not Found')

    if (!success) {

      res.status(200).json({
        success: false,
        message: 'error',
        data: []
      })
    } else {
      res.status(200).json({
        success: true,
        message: 'success',
        data: result
      })
    }
    
  }

  pyEngineCall('../st_engine/run_grab.py', tickers, onData, onEnd)
}