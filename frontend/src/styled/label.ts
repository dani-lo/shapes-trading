import styled from 'styled-components';

const STLabel = styled.label`
  display: block;
  color: ${(props) => props.theme.colors.txt.primary};
  padding: 0.4rem 0;
  font-weight: bold;
`;

STLabel.displayName = 'STLabel';

export { STLabel };
