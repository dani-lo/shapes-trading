import { Request, Response } from "express"
import { MongoCallback, DeleteWriteOpResultObject, CommandCursor, UpdateWriteOpResult } from "mongodb"

import { Match } from '@libst/match'

export const showhideMatch = (req : Request, res : Response) => {
  const { _id, hidden } = req.body

  
  const match = new Match(null, _id)

  const done : MongoCallback<UpdateWriteOpResult>  = (err : any, result: any) => {
    res.status(200).json({
      success: true,
      message: hidden ? 'match hidden' : 'match shown',
      data: []
    })
  }

  switch (hidden) {
    case true:
      match.hide(done)
      break
    case false: 
      match.show(done)
      break
  }
  
}
