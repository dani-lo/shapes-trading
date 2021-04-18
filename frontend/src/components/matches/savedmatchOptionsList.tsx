import React, { useEffect, useState } from 'react' 

import { useSTContext } from '@component/provider'
import { LoadingComponent } from '@component/hoc/withLoading'
import { WidgetMatchSetting } from '@component/widget/setting'

import { fetchSavedMatchOptions, hideSavedMatchOption, showSavedMatchOption, deleteSavedMatchOption } from '@api/match'

import { ESettingType } from '@alltypes/types'

import * as STElement from '@styled/index'

export const SavedMatchOptionsList = () : JSX.Element => {

  const [includehidden, setIncludehidden] = useState(false)

  const { 
    savedMatchOptions, 
    initSavedMatchOptions, 
    setMatchOptions, 

    showCtxSavedMatchOption,
    hideCtxSavedMatchOption,
    deleteCtxSavedMatchOption,
    stStore } = useSTContext()

  useEffect(() => {
    fetchSavedMatchOptions().then((data) => {
      initSavedMatchOptions(data)
    })
  }, [])

  return  <>
    { 
      !savedMatchOptions || savedMatchOptions.length === 0 ? <LoadingComponent /> : null
    }
    <STElement.STBox className="padding">
      <WidgetMatchSetting
        label="Include Hidden"
        type={ ESettingType.checkbox }
        val={ includehidden }
        onCheckChange={ (opt) => {
          setIncludehidden(opt.target.checked)
        }} 
      />
    </STElement.STBox>
    {
      savedMatchOptions.filter(m => includehidden ? !m.deleted : (m.visible && !m.deleted)).map((savedMatchOption, i) => {
        return <STElement.STBox key={ i } className="padding">
        <STElement.STFlexBox valign="center">
          <STElement.STBox flex={1}>
            <STElement.STSubTitle className="txt-medium padding--top padding-half-bottom">
              { savedMatchOption.matchSettings.from_ticker }
            </STElement.STSubTitle>
            <STElement.STPara  className="txt-small">
              { savedMatchOption.matchSettings.target_range_from } to { savedMatchOption.matchSettings.target_range_to }
            </STElement.STPara>
          </STElement.STBox>
        <STElement.STButton 
            onClick={ () => { 
              setMatchOptions(savedMatchOption.matchSettings) 
              stStore.matches.init([])
            }} 
            className="margin-half-right">
          <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </STElement.STButton>
        { savedMatchOption.visible ? 
              <STElement.STButton 
                onClick={ () => { 
                  hideSavedMatchOption(savedMatchOption._id).then((res : boolean) => {
                    console.log(res)
                    if (res) {
                      hideCtxSavedMatchOption(savedMatchOption)
                    }
                  })
                  
                }} 
                className="margin-half-right">
                <i className="fa fa-eye-slash" aria-hidden="true"></i>
              </STElement.STButton> :
              <STElement.STButton 
                onClick={ () => { 
                  showSavedMatchOption(savedMatchOption._id).then((res : boolean) => {
                    console.log(res)
                    if (res) {
                      showCtxSavedMatchOption(savedMatchOption)
                    }
                  })
                }} 
                className="margin-half-right">
                <i className="fa fa-eye" aria-hidden="true"></i>
              </STElement.STButton>
            }
            <STElement.STButton 
                onClick={ () => { 
                  deleteSavedMatchOption(savedMatchOption._id).then((res : boolean) => {
                    console.log(res)
                    if (res) {
                      deleteCtxSavedMatchOption(savedMatchOption)
                    }
                  })
                }} 
                className="margin-right">
                <i className="fa fa-trash" aria-hidden="true"></i>
              </STElement.STButton>
            </STElement.STFlexBox>
      </STElement.STBox>
      })
    }
  </>
}
