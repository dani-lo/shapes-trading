import React, { useEffect, useState } from 'react' 
import Tippy from '@tippyjs/react';

import { useSTContext } from '@component/provider'
import { MatchModal } from '@component/matches/matchesModal'
import { LoadingComponent } from '@component/hoc/withLoading'
import { WidgetMatchSetting } from '@component/widget/setting'

import { fetchSavedMatches, removeSavedMatch, showSavedMatch, hideSavedMatch } from '@api/match'

import { ESettingType } from '@alltypes/types'

import * as STElement from '@styled/index'

export const SavedMatchesList = () : JSX.Element => {

  const [currmatch, setCurrmatch] = useState(null)
  const [includehidden, setIncludehidden] = useState(false)

  const { savedMatches, initSavedMatches, hideCtxSavedMatch, showCtxSavedMatch } = useSTContext()

  useEffect(() => {
    fetchSavedMatches().then((data) => {
      initSavedMatches(data)
    })
  }, [])

  return  <div className="sidebar-widget">
    { 
      !savedMatches || savedMatches.length === 0 ? <LoadingComponent /> : null
    }
    <STElement.STBox className="padding">
      <h4>Saved matches</h4>
      <p>See the matches yu saved and load them (this will show the match in an overlay, in the same way as if you were seing a match result from a full form setuo.</p>
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
      savedMatches.filter(m => includehidden ? true : m.visible).map((savedMatchItem, i) => {
  
        const matchItem = savedMatchItem.matchData

        const matchFrom = matchItem[0]
        
        const key = `match-${ i }-${ matchFrom.ticker }-${ matchFrom.begin }-${ matchFrom.end }`

        return <STElement.STBox key={ key } className="padding">
          <STElement.STFlexBox valign="center">
            <STElement.STBox flex={1}>
              <STElement.STSubTitle className="txt-medium padding--top padding-half-bottom">
                { matchFrom.ticker }
              </STElement.STSubTitle>
              <STElement.STPara  className="txt-small">
                { matchFrom.begin } to { matchFrom.end }
              </STElement.STPara>
            </STElement.STBox>
            <Tippy content="View this saved match" placement="bottom" theme="light">
              <STElement.STButton 
                  onClick={ () => { 
                    setCurrmatch(matchItem) 
                  }} 
                  className="margin-half-right">
                <i className="fa fa-arrow-right" aria-hidden="true"></i>
              </STElement.STButton>
            </Tippy>
            { savedMatchItem.visible ? 
              <Tippy content="Make saved match non visible" placement="bottom" theme="light">
                <STElement.STButton 
                  onClick={ () => { 
                    hideSavedMatch(savedMatchItem._id) 
                    hideCtxSavedMatch(savedMatchItem)
                  }} 
                  className="margin-half-right">
                  <i className="fa fa-eye-slash" aria-hidden="true"></i>
                </STElement.STButton>
              </Tippy> :
              <Tippy content="Make match visible" placement="bottom" theme="light">
                <STElement.STButton 
                  onClick={ () => { 
                    showSavedMatch(savedMatchItem._id) 
                    showCtxSavedMatch(savedMatchItem)
                  }} 
                  className="margin-half-right">
                  <i className="fa fa-eye" aria-hidden="true"></i>
                </STElement.STButton>
              </Tippy>
            }
            <Tippy content="Delete saved match" placement="bottom" theme="light">
              <STElement.STButton 
                onClick={ () => {
                  removeSavedMatch(savedMatchItem._id) 
                }}>
                <i className="fa fa-trash" aria-hidden="true"></i>
              </STElement.STButton>
            </Tippy>
            </STElement.STFlexBox>
        </STElement.STBox>
      })
    }
  <MatchModal 
    onClose={ () =>  setCurrmatch(null) } 
    match={ currmatch } 
  />
  </div>
}