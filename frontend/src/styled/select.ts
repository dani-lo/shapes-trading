import styled from 'styled-components'

const STSelect = styled.div`
  .react-dropdown-select {
    border: 1px solid ${props => props.theme.colors.border.alt};
    border-radius: 0;
    background: ${props => props.theme.colors.white};
   input {
      color: ${(props) => props.theme.colors.txt.primary};
      width: 100px;
    }
    
  }
  
`;

STSelect.displayName = 'STSelect'

export { STSelect }