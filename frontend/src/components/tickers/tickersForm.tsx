import React, { useState } from 'react'

import { refreshTickers } from '@api/tickers'
import * as STElement from '@styled/index'

export const TickersForm = () : JSX.Element => {

  const [tickers, setTickers] = useState(null)

  const sendTickers = () => {
    
    const arrTickers = tickers.replace(/\s/g, '').split(',')


    refreshTickers(arrTickers)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return <STElement.STBox className="padding">
    <STElement.STSubTitle className="txt-medium padding-bottom padding-top">
      Load Or Refresh Ticker Data 
    </STElement.STSubTitle>
    <STElement.STPara className="txt-small padding-bottom">
      Enter a comma separated list of tickers that you want to either add or update to today close (20yrs up to today)
    </STElement.STPara>
    <STElement.STBox className="margin-bottom">
      <STElement.STInput
        type="text"
        value={ tickers }
        onChange={ (e) => setTickers(e.target.value)}
      />
    </STElement.STBox>
    <STElement.STBox>
      <STElement.STButton
        disabled={ !tickers } 
        onClick={ () => sendTickers()}>
        <i className="fa fa-arrow-right" aria-hidden="true"></i>
      </STElement.STButton>
    </STElement.STBox>
  </STElement.STBox>
}