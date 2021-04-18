import React from 'react'

import { CandleChart } from '@component/chart/candleChart'
import { useSTContext } from '@component/provider'

import * as STElement from '@styled/index'

import { IMatch, IMatchSettings, ITicker } from '@alltypes/types'

export const Match = ({ match, bpad, fpad, autoload } : { match : IMatch, bpad : number,  fpad: number, autoload: boolean }) : JSX.Element => {
  
  const { begin, end, ticker } = match
  const { matchOptions, stStore } = useSTContext()

  const tickersData = stStore.tickers.data as ITicker[]

  const tickerFile = tickersData.find(t => t.name === ticker).value

  const customOptions : IMatchSettings = {
    ...matchOptions,
    price_series_ticker_file : tickerFile,
    target_range_from: begin,
    target_range_to: end
  }

  return <STElement.STBox>
  <STElement.STSubTitle>
    { ticker } { begin } { end }
  </STElement.STSubTitle>
  <CandleChart
    ticker={ ticker }
    from = { begin }
    to={ end }
    fpad={ fpad }
    bpad={ bpad }
    autoload={ autoload }
    matchOptions= { customOptions }
  />
  </STElement.STBox>
}
