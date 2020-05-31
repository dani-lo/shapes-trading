export interface IPriceData {
  Open: number
  Close: number
  High: number
  Low: number
  Date: string
  DateObj ?: Date
}

export interface ITicker {
  name: string
  value: string
}

export interface IMatch {
  tickerFrom: string
  tickerTo: string
  dateFrom: string
  dateTo: string
}

export interface IStoreAction<P> {
  type: string 
  payload: P
}