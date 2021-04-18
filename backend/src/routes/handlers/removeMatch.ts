import { Request, Response } from "express"
import { MongoCallback, DeleteWriteOpResultObject, CommandCursor } from "mongodb"

import { Match } from '@libst/match'

export const removeMatch = (req : Request, res : Response) => {
  const { _id } = req.body
  
  const match = new Match(null, _id)

  const done : MongoCallback<DeleteWriteOpResultObject>  = (err : any, result: any) => {

    res.status(200).json({
      success: true,
      message: 'match deleted',
      data: _id
    })
  }

  match.remove(done)
}
