import styled from 'styled-components';

const STLabel = styled.label`
  display: block;
  color: ${(props) => props.theme.colors.txt.primary};
`;

STLabel.displayName = 'STLabel';

export { STLabel };
