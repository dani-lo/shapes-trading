import axios from 'axios'
import { IMatchSettings, IMatch, IPriceItemAPi } from '@alltypes/types'

export const fetchTickers = () : Promise<string[]> => {
  const baseUrl = process.env.API_URL

  return axios.get(`${ baseUrl }/available-tickers`)
    .then(res => {
      const { data } = res.data
      return data
    })
}

export const matchTickers = (settings : IMatchSettings) : Promise<[IPriceItemAPi, IPriceItemAPi][]> => {
  const baseUrl = process.env.API_URL
 
  return axios.post(`${ baseUrl }/match`, {settings})
    .then(res => {
      const { data } = res.data  

      return data
    })
}

export const refreshTickers = (tickers : string[]) : Promise<string[]> => {
  const baseUrl = process.env.API_URL

  return axios.post(`${ baseUrl }/refresh-tickers`, { tickers })
    .then(res => {
      const { data } = res.data

      return data
    })
}