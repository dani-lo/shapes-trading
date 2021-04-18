import React, { useContext } from 'react'

import { useMatchOptions, useAppState, useSavedMatches, useSavedMatchOptions } from '@store/store'
import { IMatch, ITicker, ISavedMatch, IMatchSettings, ISavedMatchSettings, IAppState } from '@alltypes/types'
 
import { CrudStore } from '@store/storify'

import { priceTickersReducer,
         priceMatchesReducer } from '@store/reducers'

interface IProps  {
  children: JSX.Element[]
}


interface ISTContext {
  savedMatches ?: ISavedMatch[]
  matchOptions ?: IMatchSettings
  initSavedMatches ?: (savedMatches: ISavedMatch[]) => void 
  addCtxSavedMatch ? : (savedMatch: ISavedMatch) => void 
  hideCtxSavedMatch ?: (savedMatch: ISavedMatch) => void 
  showCtxSavedMatch ?: (savedMatch: ISavedMatch) => void 
  setMatchOptions ?: (options: Partial<IMatchSettings>)  => void
  appState ?: IAppState
  setLoading ?: (opt : boolean) => void
  savedMatchOptions ?: ISavedMatchSettings[]
  initSavedMatchOptions ?: (opts: ISavedMatchSettings[]) => void
  addSavedMatchOptions ?: (opt: ISavedMatchSettings) => void
  showCtxSavedMatchOption ?: (opt: ISavedMatchSettings) => void
  hideCtxSavedMatchOption ?: (opt: ISavedMatchSettings) => void,
  deleteCtxSavedMatchOption ?: (opt: ISavedMatchSettings) => void,
  stStore ?: {
    [name: string] : {
      init: (parms: unknown) => void,
      data: ITicker[] | [IMatch, IMatch][]
    }
  }
  
}

const STContext = React.createContext({})

export const STContextProvider = (props : IProps) : JSX.Element => {

    const { matchOptions, setMatchOptions } = useMatchOptions()
    const { appState, setLoading } = useAppState()
    const { savedMatches, initSavedMatches, addCtxSavedMatch, hideCtxSavedMatch, showCtxSavedMatch } = useSavedMatches() 
    const { savedMatchOptions, initSavedMatchOptions, addSavedMatchOption, showCtxSavedMatchOption, hideCtxSavedMatchOption, deleteCtxSavedMatchOption } = useSavedMatchOptions()
    
    const stStore = {}

    CrudStore<ITicker>(
      stStore, 
      'tickers', 
      priceTickersReducer, 
      []  
    )

    CrudStore<[IMatch, IMatch]>(
      stStore,
      'matches',
      priceMatchesReducer,
      []
    )

    const ctx = {
      savedMatches, 
      initSavedMatches,
      matchOptions, 
      setMatchOptions,
      appState, 
      setLoading,
      savedMatchOptions, 
      initSavedMatchOptions, 
      addSavedMatchOption,
      showCtxSavedMatchOption,
      hideCtxSavedMatchOption,
      deleteCtxSavedMatchOption,
      addCtxSavedMatch, 
      hideCtxSavedMatch,
      showCtxSavedMatch,
      stStore
    }

    return <STContext.Provider value={ ctx }>
      { props.children }
    </STContext.Provider> 

}

export const useSTContext = () : ISTContext => useContext(STContext)