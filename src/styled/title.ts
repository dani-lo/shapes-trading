import styled from 'styled-components'

const STTitle = styled.h2`
  font-size: ${ props => props.theme.font.large }
`

const STSubTitle = styled.h3`
  font-size: ${ props => props.theme.font.medium }
`

STTitle.displayName = 'STMatches'
STSubTitle.displayName = 'STSubTitle'

export { STTitle, STSubTitle }
