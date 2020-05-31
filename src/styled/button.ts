import styled from 'styled-components';

const STButton = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.border.primary};
  padding: 1rem;
`;

STButton.displayName = 'STButton';

export { STButton };
