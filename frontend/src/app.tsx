import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import 'tippy.js/dist/tippy.css'; // optional

import { AppSidebar } from '@component/navigation/appSidebar'
import { MatchForm } from '@component/matches/matchForm' 
import { MatchesList } from '@component/matches/matchList'
import { STContextProvider } from '@component/provider'

import{ WithNotify } from '@component/widget/notify/notify'

import * as STElement from '@styled/index'
import { theme } from '@styled/theme'

import './main.scss'

const wrapper = document.getElementById('container')

const AugmentedProvider = WithNotify(STContextProvider)

const App = <ThemeProvider theme={theme}>
    <STElement.STApp  id="app">
        <AugmentedProvider>
          <MatchForm />
          <div style={{ position: 'absolute', left: '600px' }}>
            <MatchesList />
          </div>
          <STElement.STHeader className="padding-two">
            <AppSidebar />
          </STElement.STHeader>
        </AugmentedProvider>
    </STElement.STApp>
  </ThemeProvider>

ReactDOM.render(App, wrapper)
