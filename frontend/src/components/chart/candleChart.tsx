import React from 'react'

import { randId } from '@stlib/util/randId'
import { CandlestickChart } from '@stlib/chart/candlestick'

import { ST_SETTINGS } from '@settings/settings'

import * as STElement from '@styled/index'

import { fetchIndicatorsPriceSeries } from '@api/priceSeries'
import { IMatchSettings } from '@alltypes/types'

interface IProps {
  ticker: string 
  from: string
  to: string
  fpad: number
  bpad: number
  autoload: boolean
  matchOptions: IMatchSettings
}

interface IState {
  plotted: boolean
}

export class CandleChart extends React.Component<IProps, IState> {
  chartID: string
  chart: CandlestickChart
  
  constructor (props : IProps) {
    super(props)

    this.chartID = `${randId()}`

    this.state= {
      plotted: props.autoload
    }
  }

  componentDidMount(): void {
    const chartID = this.chartID

    const { from, to, autoload } = this.props 

    this.chart = new CandlestickChart(
      chartID, 
      { w: ST_SETTINGS.chart.width, h: ST_SETTINGS.chart.height },
      from,
      to 
    )
    
    if (autoload) {
      this.plot()
    }
  } 

  plot () : void {
    const { matchOptions, fpad, bpad, autoload } = this.props 

    fetchIndicatorsPriceSeries(matchOptions, fpad, bpad).then(prices => {
      this.chart.setPrices(prices).plot()

      if (!autoload) {
        this.setState({plotted: true})
      }
    })
  }

  render(): JSX.Element {
    const { autoload } = this.props 

    return <>
    {
      (!autoload) ? 
      <STElement.STButton
        onClick={  () => this.plot()}
        disabled={ this.state.plotted }
      > 
        Plot Match Result
      </STElement.STButton> :
      null
    }
      <STElement.STCandleChart 
        id={ this.chartID } 
        h={ ST_SETTINGS.chart.height } 
        w={ ST_SETTINGS.chart.width } 
      />
    </>
  }
}
