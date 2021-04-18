import { IPriceData, IPriceItemAPi } from '@alltypes/types'

export abstract class Plotter {
  targetID: string
  prices: IPriceData[]
  from: string
  to: string
  size: {
    w: number
    h: number
  }

  constructor(
      targetID: string, 
      size: {w: number, h: number}, 
      from: string, 
      to: string) {

    this.targetID = targetID
    this.size = size
    this.from = from
    this.to = to
  }

  setPrices (apiPrices : IPriceItemAPi[]) : this {
    this.prices = apiPrices.map(p => {
      return {
        ...p,
        Open: parseFloat(p.Open),
        Low: parseFloat(p.Low),
        Close: parseFloat(p.Close),
        High: parseFloat(p.High)
      }
    })

    return this
  }

  abstract plot(): void
}
