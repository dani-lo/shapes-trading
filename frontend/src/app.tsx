import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import { AppSidebar } from '@component/navigation/appSidebar'
import { MatchForm } from '@component/matches/matchForm' 
import { MatchesList } from '@component/matches/matchList'
import { STContextProvider } from '@component/provider'

import * as STElement from '@styled/index'
import { theme } from '@styled/theme'

import './main.scss'

const wrapper = document.getElementById('container')

const App = (
  <ThemeProvider theme={theme}>
    <STElement.STApp>
      <STContextProvider>
        <STElement.STFlexBox 
          style={{position: 'relative', left: '100px', width: 'calc(100% - 100px)'}} 
          direct="row">
          <STElement.STBox>
            <MatchForm />
          </STElement.STBox>
          <STElement.STBox>
            <MatchesList />
          </STElement.STBox>
        </STElement.STFlexBox>
        <STElement.STHeader className="padding-two">
          <AppSidebar />
        </STElement.STHeader>
      </STContextProvider>
    </STElement.STApp>
  </ThemeProvider>
)

ReactDOM.render(App, wrapper)
