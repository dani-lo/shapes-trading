import React from 'react'
import * as d3 from 'd3'

import { randId } from '@stlib/util/randId'
import { CandlestickChart } from '@stlib/chart/candlestick'

import { ST_SETTINGS } from '@settings/settings'

import * as STElement from '@styled/index'


import { IPriceData } from '@alltypes/types'
import { DSVRowArray } from 'd3'

export class CandleChart extends React.Component {
  chartID: string

  componentDidMount(): void {
    const chartID = this.chartID

    d3.csv('/assets/data.csv').then((csvprices : DSVRowArray<string>)  => {

      const prices : IPriceData[] = csvprices.map(p => {
        return {
          Open: Number(p.Open),
          High: Number(p.High),
          Close: Number(p.Close),
          Low: Number(p.Low),
          Date: p.Date
        }
      })

      const chart = new CandlestickChart(chartID, prices, {w: ST_SETTINGS.chart.width, h: ST_SETTINGS.chart.height})

      chart.plot()
    })
  }

  render(): JSX.Element {
    this.chartID = `${randId()}`

    return <STElement.STCandleChart 
      id={ this.chartID } 
      h={ ST_SETTINGS.chart.height } 
      w={ ST_SETTINGS.chart.width } 
    />
  }
}
