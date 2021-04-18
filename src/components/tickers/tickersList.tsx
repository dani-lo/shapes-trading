import React from 'react'

import { useSTContext } from '@component/provider'
import { ITicker } from '@alltypes/types'

export const TickersList = () : JSX.Element => {

  const { stStore } = useSTContext()
  
  const tickersData = stStore.tickers.data as ITicker[]
  return <ul>
    {
     tickersData.map((ticker, i) => <li key={`ticker-${ i }`}>{ ticker.name }</li>)
    }
  </ul>
}