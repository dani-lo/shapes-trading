import { useReducer } from 'react'

import * as reducers from './reducers'
import { ITicker, IMatch } from '@alltypes/types'

const initialTickers = []
const initialMatches = []

interface IUsePriceTickers {
  tickers: ITicker[]
  populateTickers : (arg: string[]) => void
}

interface IUsePriceMatches {
  matches: IMatch[]
  setMatches : (arg: IMatch[]) => void
}


export const usePriceTickers = () : IUsePriceTickers => {
  const [tickers, dispatch] = useReducer(reducers.priceTickersReducer, initialTickers)

  const populateTickers = (apiTickers) => dispatch({type: 'populatePriceTickers', payload: apiTickers})

  return { tickers, populateTickers }
}

export const usePriceMatches = () : IUsePriceMatches => { 
  const [matches, dispatch] = useReducer(reducers.priceMatchesReducer, initialMatches)

  const setMatches = (apiMatches) => dispatch({type: 'addPriceMatches', payload: apiMatches})

  return { matches, setMatches }
}

// export const useSavedPriceMatches = () => {}

// export const useApp = () => {}