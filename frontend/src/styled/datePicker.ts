import styled from 'styled-components'

const STDatePicker = styled.div`
  input {
    border: 1px solid ${props => props.theme.colors.border.alt};
    padding: 12px;
    width:100px;
    color: ${(props) => props.theme.colors.txt.primary};
  }
`

STDatePicker.displayName = 'STDatePicker'

export {
  STDatePicker
}