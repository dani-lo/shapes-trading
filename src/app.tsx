import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import { Form } from '@component/widget/form'
import { CandleChart } from '@component/chart/candleChart'
import { TickersList } from '@component/tickers/tickersList'

import * as STElement from '@styled/index'

import { theme } from '@styled/theme'

const wrapper = document.getElementById('container')

const App = (
  <ThemeProvider theme={theme}>
    <STElement.STApp>
      <STElement.STHeader>
        <STElement.STTitle>Shapes Trading Forecast</STElement.STTitle>
      </STElement.STHeader>
      <Form />
      <CandleChart />
      <TickersList />
    </STElement.STApp>
  </ThemeProvider>
)
console.log('JJJJ')
ReactDOM.render(App, wrapper)
