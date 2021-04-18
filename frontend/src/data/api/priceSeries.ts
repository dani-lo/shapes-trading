import axios from 'axios'

import { IPriceItemAPi, IMatchSettings } from '@alltypes/types'

export const fetchPriceSeries = (ticker : string, from: string, to: string, fpad = 0, bpad = 0) : Promise<IPriceItemAPi[]> => {
  const baseUrl = process.env.API_URL


  return axios.get(`${ baseUrl }/price-series/${ ticker }/${ from }/${ to }/${ bpad }/${ fpad }`)
    .then(res => {
      const { data } = res.data
      return data
    })
}

export const fetchIndicatorsPriceSeries = (settings: IMatchSettings, fpad  = 0, bpad = 0) : Promise<IPriceItemAPi[]> => {
  const baseUrl = process.env.API_URL

  return axios.post(`${ baseUrl }/price-series-indicators`, {settings: {...settings,  bpad, fpad }})
    .then(res => {
      const { data } = res.data
      return data
    })
}