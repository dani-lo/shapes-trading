import { IPriceData } from '@alltypes/types'

export abstract class Plotter {
  targetID: string
  prices: IPriceData[]
  size: {
    w: number
    h: number
  }

  constructor(targetID: string, prices: IPriceData[], size: {w: number, h: number}) {
    this.targetID = targetID
    this.prices = prices
    this.size = size
  }

  abstract plot(): void
}
