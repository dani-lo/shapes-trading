import styled from 'styled-components';

const STHeader = styled.header`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  position: fixed;
  height: 100%;
  top: 0;
`;

STHeader.displayName = 'STHeader';

export { STHeader };
