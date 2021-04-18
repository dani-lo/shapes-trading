import styled from 'styled-components'

const STPara = styled.p`
  color: ${(props) => props.theme.colors.txt.primary};
  padding: 0;
  margin: 0;
`

STPara.displayName = 'STPara'

export { STPara }
