import React from 'react'
import styled from 'styled-components'

const STCheckContainer = styled.label`

  display: block;
  position: relative;
  padding-left: 12px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.txt.primary};

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

/* Hide the browser's default checkbox */
span.lbl {
  padding-left: 15px;
}
input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 19px;
  background-color: #ccc;
  border: 1px solid  ${(props) => props.theme.colors.border.dark};
}

/* On mouse-over, add a grey background color */
&:hover input ~ .checkmark {  
  background-color: #aaa;
}

/* When the checkbox is checked, add a blue background */
input:checked ~ .checkmark {
  background-color: ${ props => props.theme.colors.primary };
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkmark:after {
  left: 5px;
  top: 3px;
  width: 3px;
  height: 9px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
`

const STCheckElement = styled.input`
`

STCheckElement.displayName = 'STCheckElement'

interface IProps  {
  onChange: (val) => void 
  checked: boolean
  label: string
}

export const STCheck = ({onChange, checked, label} : IProps) : JSX.Element=> {
  
  return <STCheckContainer>
    <span className="txt-small lbl">{ label }</span>
    <input 
      type="checkbox"
      onChange={ onChange }
      checked={ checked }
    />
    <span className="checkmark"></span>
  </STCheckContainer>
}