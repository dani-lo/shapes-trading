import { Request, Response } from "express"

import { MatchOptions } from '@libst/matchOptions'

export const  fetchMatchOptions = async (req : Request, res : Response) => {

  try {
    const matchOptions = await MatchOptions.fetchAll()

    res.status(200).json({
      success: true,
      message: 'success',
      data: matchOptions
    })
  } catch (e) {

    res.status(200).json({
      success: false,
      message: 'problem fetching saved matche opts',
      data: []
    })
  }
}