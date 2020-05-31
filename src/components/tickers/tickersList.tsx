import React, { useEffect, useReducer } from 'react'

import { fetchTickers } from '@api/tickers'
import { usePriceTickers } from '@store/store'

export const TickersList = () => {

  const { tickers, populateTickers } = usePriceTickers()

  useEffect(() => {
    fetchTickers().then((t) => populateTickers(t))
  }, [])
  
  return <ul>
    {
     tickers.map((ticker, i) => <li key={`ticker-${ i }`}>{ ticker.name }</li>)
    }
  </ul>
}