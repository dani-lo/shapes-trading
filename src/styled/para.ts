import styled from 'styled-components'

const STPara = styled.p`
  font-size: ${ props => props.theme.font.small }
`

STPara.displayName = 'STPara'

export { STPara }
