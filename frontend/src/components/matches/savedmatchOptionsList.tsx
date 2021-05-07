import React, { useEffect, useState } from 'react' 
import Tippy from '@tippyjs/react';

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

  return  <div className="sidebar-widget">
    { 
      !savedMatchOptions || savedMatchOptions.length === 0 ? <LoadingComponent /> : null
    }
    <STElement.STBox className="padding">
      <h4>Saved match settings</h4>
      <p>See te match settings you have previously saved: these are stored data representing a match form setup, at the time you saved it</p>
      <p>Upon loading one of your saved match settings from this list, the matches form will automatically populate with the saved settings. You will still need to submit the fprm tp view the resulting matches</p>
      <p>Note you can hide matches and these will not show unless you tick on <b>Include hidden</b></p>
    </STElement.STBox>
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
          <Tippy content="Load match form settings to match form" placement="bottom" theme="light">
            <STElement.STButton 
                onClick={ () => { 
                  setMatchOptions(savedMatchOption.matchSettings) 
                  stStore.matches.init([])
                }} 
                className="margin-half-right">
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </STElement.STButton>
          </Tippy>
        { savedMatchOption.visible ? 
          <Tippy content="Make this match form settings non visible" placement="bottom" theme="light">
              <STElement.STButton 
                onClick={ () => { 
                  hideSavedMatchOption(savedMatchOption._id).then((res : boolean) => {
                    if (res) {
                      hideCtxSavedMatchOption(savedMatchOption)
                    }
                  })
                  
                }} 
                className="margin-half-right">
                <i className="fa fa-eye-slash" aria-hidden="true"></i>
              </STElement.STButton>
          </Tippy> :
          <Tippy content="Make this match form settings visible" placement="bottom" theme="light">
              <STElement.STButton 
                onClick={ () => { 
                  showSavedMatchOption(savedMatchOption._id).then((res : boolean) => {
                    if (res) {
                      showCtxSavedMatchOption(savedMatchOption)
                    }
                  })
                }} 
                className="margin-half-right">
                <i className="fa fa-eye" aria-hidden="true"></i>
              </STElement.STButton>
            </Tippy>
            }
            <Tippy content="Delete this match form settings" placement="bottom" theme="light">
              <STElement.STButton 
                onClick={ () => { 
                  deleteSavedMatchOption(savedMatchOption._id).then((res : boolean) => {
                    if (res) {
                      deleteCtxSavedMatchOption(savedMatchOption)
                    }
                  })
                }} 
                className="margin-right">
                <i className="fa fa-trash" aria-hidden="true"></i>
              </STElement.STButton>
            </Tippy>
            </STElement.STFlexBox>
      </STElement.STBox>
      })
    }
  </div>
}
