import React from 'react'
import styled from 'styled-components'

import Select from "react-dropdown-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import * as STElement from '@styled/index'

import { ESettingType, TSettingOption, IInputValue } from '@alltypes/types'

const STElementWidgetSetting = styled.div`
  width: 160px;
`

interface IProps {
  minDate ?: string 
  maxDate ?: string
  disabled ?: boolean
  type : ESettingType
  label: string
  onDateChange ?: (e : Date) => void
  onOptionChange ?: (e : TSettingOption | TSettingOption[]) => void
  onTxtChange ?: (e :IInputValue) => void
  onCheckChange ?: (e : { target : { checked: boolean}}) => void
  val ?: string | Date | boolean
  values ?: {
    value: string
    label: string
  }[]
  options ?: {
    value: string
    label: string
  }[]
}
export const WidgetMatchSetting = (props : IProps) : JSX.Element => {

  const { type, label, onDateChange, onOptionChange, onTxtChange, onCheckChange, val, values, options, minDate, maxDate, disabled } = props

  switch (type) {
    case ESettingType.text :
      return <STElementWidgetSetting>
        <STElement.STLabel className="txt-small">{ label }</STElement.STLabel>
        <STElement.STInput value={ val as string} onChange={ onTxtChange } />
      </STElementWidgetSetting>
    case ESettingType.checkbox :
      return <STElementWidgetSetting>
        <STElement.STCheck 
          checked={ val as boolean} 
          onChange={ onCheckChange } 
          label={ label }
        />
      </STElementWidgetSetting>
    case ESettingType.options :
      return <STElementWidgetSetting>
        <STElement.STLabel className="txt-small">{ label }</STElement.STLabel>
        <STElement.STSelect>
        <Select
          options = { options }
          values={ values }
          onChange={ onOptionChange } 
        />
        </STElement.STSelect>
      </STElementWidgetSetting>
    case ESettingType.multioptions :
      return <STElementWidgetSetting>
        <STElement.STLabel className="txt-small">{ label }</STElement.STLabel>
        <STElement.STSelect>
        <Select
          multi={ true }
          options = { options }
          values={ values }
          onChange={ onOptionChange } 
        />
        </STElement.STSelect>
      </STElementWidgetSetting>
    case ESettingType.date :
      return <STElementWidgetSetting>
        <STElement.STDatePicker>
          <STElement.STLabel className="txt-small">{ label }</STElement.STLabel>
          <DatePicker 
            selected={ val } 
            disabled={ disabled }
            minDate={ new Date(minDate) }
            maxDate={ new Date(maxDate) }
            onChange={ onDateChange } />
        </STElement.STDatePicker>
      </STElementWidgetSetting>
  }
} 