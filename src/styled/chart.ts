import styled from 'styled-components'

interface ICandleChartProps {
  w: number
  h: number
}

const STCandleChart = styled.div<ICandleChartProps>`
  width: ${ props => props.w }px;
  height: ${ props => props.h }px;
  background: ${(props) => props.theme.colors.bg.primary};
  border: 1px solid ${(props) => props.theme.colors.border.alt};
`

STCandleChart.displayName = 'STCandleChart'

export { STCandleChart }
