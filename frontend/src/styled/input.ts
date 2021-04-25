import styled from 'styled-components'

const STInput = styled.input`
  border: 1px solid ${props => props.theme.colors.border.dark};
  padding: 0.5rem;
  color: ${(props) => props.theme.colors.txt.primary};
  width:100px;
`

STInput.displayName = 'STList'

export { STInput }