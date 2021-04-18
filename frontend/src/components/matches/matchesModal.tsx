import React from 'react' 
import { Modal } from 'react-responsive-modal'

import 'react-responsive-modal/styles.css'

import { Match } from '@component/matches/match'

import * as STElement from '@styled/index'

import { IMatch } from '@alltypes/types'

interface IProps {
  match: IMatch | null
  onClose: () => void
}

export const MatchModal = ({ match, onClose} : IProps) : JSX.Element => {

  return <Modal open={ match !== null } onClose={ onClose } center>
    <STElement.STFlexBox>
      {
        match !== null ?
        <>
          <Match match={ match[0] } bpad={match[0].bpad || 70} fpad={match[0].fpad ||  1} autoload={ true } />
          <Match match={ match[1] } bpad={match[1].bpad || 70} fpad={match[1].bpad || 80} autoload={ true } />
        </>:
        null
      }
      
    </STElement.STFlexBox>
  </Modal>
}