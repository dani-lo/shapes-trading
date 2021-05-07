import React, { useState } from 'react' 

import { useSTContext } from '@component/provider'
import { MatchModal } from '@component/matches/matchesModal'
import { WithLoading } from '@component/hoc/withLoading'

import { saveMatch } from '@api/match'

import * as STElement from '@styled/index'
import { IMatch } from '@alltypes/types'

const MatchesListComponent = () : JSX.Element => {

  const [currmatch, setCurrmatch] = useState(null)

  const { addCtxSavedMatch, stStore } = useSTContext()
  
  const matchData = stStore.matches.data as [IMatch, IMatch][]
  
  return  <>
    <STElement.STFlexBox wrap="wrap" className="margin-left" >
      {
        matchData && !matchData.length ?
        <STElement.STSubTitle className="padding">No matches for these settings</STElement.STSubTitle> :
        null
      }
    {
      matchData && matchData.map((matchItem, i) => {
        
        const matchFrom = matchItem[0]
        const matchTo = matchItem[1]
        
        const key = `match-${ i }-${ matchFrom.ticker }-${ matchFrom.begin }-${ matchFrom.end }`

        return <STElement.STFlexBox 
            key={ key } 
            className="padding-top margin">
          <STElement.STBox widthpx="200">
            <STElement.STSubTitle className="txt-medium">
              { matchFrom.ticker }
            </STElement.STSubTitle>
            <STElement.STPara>
              { matchFrom.begin } to { matchFrom.end }
            </STElement.STPara>
          </STElement.STBox>
          <STElement.STBox  widthpx="200">
            <STElement.STSubTitle>
              { matchTo.ticker }
            </STElement.STSubTitle>
            <STElement.STPara>
              { matchTo.begin } to { matchTo.end }
            </STElement.STPara>
          </STElement.STBox>
          <STElement.STBox>
          <STElement.STFlexBox 
              valign="center" 
              height="100%">
            <STElement.STButton onClick={ () => setCurrmatch(matchItem) }>
              <i className="fa fa-eye" aria-hidden="true"></i>
            </STElement.STButton>
            <STElement.STButton onClick={ () => {
              saveMatch(matchItem).then(savedMatch => {
                addCtxSavedMatch(savedMatch)
              })
            }}>
              <i className="fa fa-floppy-o" aria-hidden="true"></i>
            </STElement.STButton>
            </STElement.STFlexBox>
          </STElement.STBox>
        </STElement.STFlexBox>
      })
    }
    </STElement.STFlexBox>
    <MatchModal 
      onClose={ () =>  setCurrmatch(null) } 
      match={ currmatch } 
    />
  </>
}

const MatchesList = WithLoading(MatchesListComponent)

export { MatchesList }