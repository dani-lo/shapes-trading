import styled from 'styled-components';

const STButton = styled.button`
  background: ${(props) => props.theme.colors.btnMain};
  border-radius: 4px;
  border: 1px solid black;
  color: white;
  padding: 1rem;
`;

STButton.displayName = 'STButton';

export { STButton };
