import axios from 'axios'

export const fetchTickers = () : Promise<string[]> => {
  const baseUrl = process.env.API_URL

  return axios.get(`${ baseUrl }/available-tickers`)
    .then(res => {
      const { data } = res.data
      return data
    })
}