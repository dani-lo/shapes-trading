import React, { useState } from 'react'
import Sidebar from "react-sidebar";

import { SavedMatchesList } from '@component/matches/savedmatchesList'
import { SavedMatchOptionsList } from '@component/matches/savedmatchOptionsList'
import { TickersForm } from '@component/tickers/tickersForm'

import * as STElement from '@styled/index'

const styles = {
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden"
  },
  sidebar: {
    zIndex: 2,
    position: "fixed",
    top: 0,
    bottom: 0,
    transition: "transform .3s ease-out",
    WebkitTransition: "-webkit-transform .3s ease-out",
    willChange: "transform",
    overflowY: "auto",
    height: "100%",
    background: "#fff",
    width: '420px'
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    transition: "left .3s ease-out, right .3s ease-out"
  },
  overlay: {
    zIndex: 1,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    visibility: "hidden",
    transition: "opacity .3s ease-out, visibility .3s ease-out",
    backgroundColor: "rgba(0,0,0,.3)"
  },
  dragHandle: {
    zIndex: 1,
    position: "fixed",
    top: 0,
    bottom: 0
  }
};

const sidebarUIs = {
  'SAVED_MATCHES': 'SAVED_MATCHES',
  'REFRESH_TICKERS': 'REFRESH_TICKERS',
  'SAVED_MATCH_OPTIONS': 'SAVED_MATCH_OPTIONS', 
  'TRADES': 'TRADES'
}

export const AppSidebar = () : JSX.Element => {

  const [ isOpen, setIsopen ] = useState(false)
  const [ activeui, setActiveui ] = useState(null)

  const sidebarUI = () => {
    if (activeui === sidebarUIs.SAVED_MATCHES) {
      return <SavedMatchesList />
    } else if (activeui === sidebarUIs.REFRESH_TICKERS) {
      return <TickersForm />
    } else if (activeui === sidebarUIs.SAVED_MATCH_OPTIONS) {
      return <SavedMatchOptionsList />
    }
    return null
  }

  return (
    <Sidebar
      sidebar={ sidebarUI() }
      open={ isOpen }
      onSetOpen={ () => {
        setIsopen(!isOpen)
      }}
      styles={ styles }
    >
      <STElement.STIconButton 
        className="fa fa-line-chart  margin-two-top padding-top padding-left padding-right txt-large" 
        aria-hidden="true" 
        onClick={ () => {
          setActiveui(sidebarUIs.SAVED_MATCHES)
          setIsopen(true) 
        }}
      />
      <STElement.STIconButton 
        className="fa fa-tasks  margin-two-top padding-top padding-left padding-right txt-large" 
        aria-hidden="true" 
        onClick={ () => {
          setActiveui(sidebarUIs.SAVED_MATCH_OPTIONS)
          setIsopen(true) 
        }}
      />
      <STElement.STIconButton 
        className="fa fa-refresh  margin-two-top padding-top padding-left padding-right txt-large" 
        aria-hidden="true" 
        onClick={ () => {
          setActiveui(sidebarUIs.REFRESH_TICKERS)
          setIsopen(true) 
        }}
      />
    </Sidebar>
  );
} 
