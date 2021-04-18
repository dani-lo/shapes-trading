import styled from 'styled-components';

const STButton = styled.button<{
  darkbg ?: boolean;
  disabled ?: boolean;
}>`
  background: ${(props) => props.darkbg ? props.theme.colors.white : props.theme.colors.primary};
  color: ${(props) => props.darkbg ? props.theme.colors.txt.primary : props.theme.colors.white};
  border-radius: 4px;
  border: 1px solid ${(props) => props.darkbg ? props.theme.colors.border.primary :props.theme.colors.border.alt};
  padding: 0.8rem;
  opacity: ${(props) => props.disabled ? '0.5' : '1' };
  cursor: ${(props) => props.disabled ? 'default' : 'pointer' };
  ${(props) => props.disabled ? 'pointer-events: none' : '' };
  &:hover {
    color: ${(props) => props.darkbg ? props.theme.colors.txt.white : props.theme.colors.primary};
    background: ${(props) => props.darkbg ? props.theme.colors.primary : props.theme.colors.white};
  }
`

STButton.displayName = 'STButton';

const STIconButton = styled.i<{
  darkbg ?: boolean;
  disabled ?: boolean;
}>`
  opacity: ${(props) => props.disabled ? '0.5' : '1' };
  cursor: ${(props) => props.disabled ? 'default' : 'pointer' };
  color: ${(props) => props.darkbg ? props.theme.colors.txt.primary : props.theme.colors.white};
  &:hover {
    opacity: 0.5;
  }
`

export { STButton, STIconButton };
