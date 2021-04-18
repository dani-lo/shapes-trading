import { Request, Response } from "express"
import { MongoCallback, InsertOneWriteOpResult } from "mongodb"

import { MatchOptions } from '@libst/matchOptions'

export const  saveMatchOptions = (req : Request, res : Response) => {

  const { matchSettings } = req.body
  
  const matchOpts = new MatchOptions(matchSettings)

  const done : MongoCallback<InsertOneWriteOpResult<any>>  = (err : any) => {
    if (!err) {
      res.status(200).json({
        success: true,
        message: 'saved match options',
        data: []
      })
    } else {
      res.status(200).json({
        success: false,
        message: 'could not save match options',
        data: []
      })
    }
    
  }

  matchOpts.save(done)
}