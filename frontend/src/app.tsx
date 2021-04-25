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
    <STElement.STApp  id="app">
      <STContextProvider>
        <MatchForm />
        <MatchesList />
        <STElement.STHeader className="padding-two">
          <AppSidebar />
        </STElement.STHeader>
      </STContextProvider>
    </STElement.STApp>
  </ThemeProvider>
)

ReactDOM.render(App, wrapper)
