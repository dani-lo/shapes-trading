import * as d3 from 'd3'
import { map as _map } from 'lodash'

import { Plotter } from '@stlib/chart/plotter'

export class CandlestickChart extends Plotter {
  plot(): void {
    const prices = this.prices
    const chartID = this.targetID

    const dateFormat = d3.timeParse('%Y-%m-%d')

    const months = {
      0: 'Jan',
      1: 'Feb',
      2: 'Mar',
      3: 'Apr',
      4: 'May',
      5: 'Jun',
      6: 'Jul',
      7: 'Aug',
      8: 'Sep',
      9: 'Oct',
      10: 'Nov',
      11: 'Dec',
    }

    for (let i = 0; i < prices.length; i++) {
      prices[i]['DateObj'] = dateFormat(prices[i]['Date'])
    }

    const margin = { top: 15, right: 25, bottom: 55, left: 35 },
      w = this.size.w - margin.left - margin.right,
      h = this.size.h - margin.top - margin.bottom

    const svg = d3
      .select(`#${chartID}`)
      .append('svg')
      .attr('width', w + margin.left + margin.right)
      .attr('height', h + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    const dates = _map(prices, 'DateObj')

    const datesRange = d3.range(-1, dates.length).map(d => String(d))

    const xScale = d3.scaleLinear().domain([-1, dates.length]).range([0, w])
    const xBand = d3.scaleBand().domain(datesRange).range([0, w]).padding(0.3)
    
    d3.axisBottom(null)
      .scale(xScale)
      .tickFormat(function (d : Date) {
        d = dates[d]

        console.log(d)

        if (!d) {
          return ''
        }

        return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear()
      })

    svg
      .append('rect')
      .attr('id', 'rect')
      .attr('width', w)
      .attr('height', h)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .attr('clip-path', 'url(#clip)')

    // const gX = svg
    //   .append('g')
    //   .attr('class', 'axis x-axis') //Assign "axis" class
    //   .attr('transform', 'translate(0,' + h + ')')
    //   .call(xAxis)

    // gX.selectAll('.tick text').call(wrap, xBand.bandwidth())

    const ymin = d3.min(prices.map((r) => r.Low))
    const ymax = d3.max(prices.map((r) => r.High))
    const yScale = d3.scaleLinear().domain([ymin, ymax]).range([h, 0]).nice()
    const yAxis = d3.axisLeft(yScale)

    svg.append('g').attr('class', 'axis y-axis').call(yAxis)

    const chartBody = svg.append('g').attr('class', 'chartBody').attr('clip-path', 'url(#clip)')

    // draw rectangles
    chartBody
      .selectAll('.candle')
      .data(prices)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(i) - xBand.bandwidth())
      .attr('class', 'candle')
      .attr('y', (d) => yScale(Math.max(d.Open, d.Close)))
      .attr('width', xBand.bandwidth())
      .attr('height', (d) =>
        d.Open === d.Close ? 1 : yScale(Math.min(d.Open, d.Close)) - yScale(Math.max(d.Open, d.Close)),
      )
      .attr('fill', (d) => (d.Open === d.Close ? 'silver' : d.Open > d.Close ? 'red' : 'green'))

    // draw high and low
    chartBody
      .selectAll('g.line')
      .data(prices)
      .enter()
      .append('line')
      .attr('class', 'stem')
      .attr('x1', (d, i) => xScale(i) - xBand.bandwidth() / 2)
      .attr('x2', (d, i) => xScale(i) - xBand.bandwidth() / 2)
      .attr('y1', (d) => yScale(d.High))
      .attr('y2', (d) => yScale(d.Low))
      .attr('stroke', (d) => (d.Open === d.Close ? 'white' : d.Open > d.Close ? 'red' : 'green'))

    svg.append('defs').append('clipPath').attr('id', 'clip').append('rect').attr('width', w).attr('height', h)
  }
}
