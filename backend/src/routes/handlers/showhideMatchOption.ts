import { Request, Response } from "express"
import { MongoCallback, DeleteWriteOpResultObject, CommandCursor, UpdateWriteOpResult } from "mongodb"

import { MatchOptions } from '@libst/matchOptions'

export const showhideMatchOption = (req : Request, res : Response) : void => {
  const { _id, hidden, deleted } = req.body
  
  const matchOption = new MatchOptions(null, _id)

  const done : MongoCallback<UpdateWriteOpResult>  = (err : any, result: any) => {

    if (!err) {
      res.status(200).json({
        success: true,
        message: hidden ? 'match hidden' : 'match shown',
        data: []
      })
    } else {
      res.status(200).json({
        success: false,
        message: hidden ? 'match hidden - fail' : 'match shown - fail',
        data: []
      })
    }
  }

  if (deleted) {
    matchOption.delete(done)
  } else {
    switch (hidden) {
      case true:
        matchOption.hide(done)
        break
      case false: 
        matchOption.show(done)
        break
    }
  }
  
  
}
