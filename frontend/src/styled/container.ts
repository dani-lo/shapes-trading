import styled from 'styled-components'

const STFlexBox = styled.div<{
    weight ?: number
    direct ?: 'column' | 'row'
    wrap   ?: 'wrap' | 'nowrap'
    halign ?: string;
    valign ?: string;
    border ?: string;
    height ?: string;
    bg ?: boolean;
  }>`
  display: flex;
  ${ props => props.bg ? 'background:' + props.theme.colors.bg.primary  + ';'  : ''}
  ${ props => props.height ? 'height:' + props.height  + ';' : ''}
  ${ props => props.border ? 'border-style: solid;border-color:' + props.theme.colors.border.primary + ';border-width:' + props.border : ''}
  ${ props => props.valign === 'bottom' ? 'align-items: flex-end;' : ''}
  ${ props => props.valign ? 'align-items:' + props.valign + ';' : ''}
  ${ props => props.direct ? 'flex-direction:' + props.direct + ';' : ''}
  ${ props => props.wrap ? 'flex-wrap:' + props.wrap + ';' : ''}
`

const STBox = styled.div<{
    flex ?: number;
    width ?: string; 
    height ?: string;
    border ?: string;
    widthpx ?: string;
    stick ?: 'left' | 'right';
    bg ?: boolean;
  }>`
  position: relative;
  ${ props => props.bg ? 'background:' + props.theme.colors.bg.primary  + ';'  : ''}
  ${ props => props.flex ? 'flex:' + props.flex  + ';'  : ''}
  ${ props => props.width ? 'width:' + props.width  + ';'  : ''}
  ${ props => props.widthpx ? 'width:' + props.widthpx  + 'px;' : ''}
  ${ props => props.height ? 'height:' + props.height  + ';'  : ''}
  ${ props => props.border ? 'border-style: solid;border-color:' + props.theme.colors.border.primary + ';border-width:' + props.border : ';'}
  ${ props => props.stick ? 'position: absolute;top: 0;' + props.stick  + ': 1rem;'  : ''}
`

STBox.displayName = 'STBox'
STFlexBox.displayName = 'STFlexBox'

export { STBox, STFlexBox }
