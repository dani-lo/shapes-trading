import { Request, Response } from "express"
import { MongoCallback, InsertOneWriteOpResult } from "mongodb"

import { Match } from '@libst/match'

export const  saveMatch = (req : Request, res : Response) => {

  const { matchData } = req.body
  
  const match = new Match(matchData)

  const done : MongoCallback<InsertOneWriteOpResult<any>>  = (p : any, result : InsertOneWriteOpResult<{_id: string } & Match>) => {

    res.status(200).json({
      success: true,
      message: 'some happened',
      data: result.insertedId    
    })
  }

  match.save(done)
}