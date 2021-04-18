import { Request, Response } from "express"

import { Match } from '@libst/match'

export const  fetchMatches = async (req : Request, res : Response) => {

  try {
    const matches = await Match.fetchAll()

    res.status(200).json({
      success: true,
      message: 'success',
      data: matches
    })
  } catch (e) {

    res.status(200).json({
      success: false,
      message: 'problem fetching matches',
      data: []
    })
  }
}