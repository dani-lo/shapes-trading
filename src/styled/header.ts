import styled from 'styled-components';

const STHeader = styled.header`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  padding: 1rem;
`;

STHeader.displayName = 'STHeader';

export { STHeader };
