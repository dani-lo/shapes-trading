import styled from 'styled-components'

const STAppTitle = styled.h1`
color: ${(props) => props.theme.colors.white};
padding: 0;
margin: 0;
`

const STTitle = styled.h2`
  color: ${(props) => props.theme.colors.txt.primary};
  padding: 0;
  margin: 0;
`

const STSubTitle = styled.h3`
  color: ${(props) => props.theme.colors.txt.primary};
  padding: 0;
  margin: 0;
`

STTitle.displayName = 'STMatches'
STSubTitle.displayName = 'STSubTitle'

export { STTitle, STSubTitle, STAppTitle }
