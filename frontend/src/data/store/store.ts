import { useReducer } from 'react'

import * as reducers from './reducers'

import { matchOptions } from '@stlib/util/matchOptions'

import { ITicker, IMatch, ISavedMatch, IMatchSettings, ISavedMatchSettings, IAppState } from '@alltypes/types'

const initialTickers = []
const initialMatches = []
const initialMatchOptions = matchOptions


interface IUsePriceTickers {
  tickers: ITicker[]
  populateTickers : (arg: string[]) => void
}

interface IUsePriceMatches {
  matches: [IMatch, IMatch][]
  setMatches : (arg: [IMatch, IMatch][]) => void
}

interface IUsePriceOptions {
  matchOptions: IMatchSettings
  setMatchOptions : (arg : Partial<IMatchSettings>) => void
}

interface IUseSavedMatchOptions {
  savedMatchOptions: ISavedMatchSettings[]
  initSavedMatchOptions : (arg : ISavedMatchSettings[]) => void,
  addSavedMatchOption : (arg : ISavedMatchSettings) => void,
  showCtxSavedMatchOption : (arg : ISavedMatchSettings) => void,
  hideCtxSavedMatchOption : (arg : ISavedMatchSettings) => void,
  deleteCtxSavedMatchOption : (arg : ISavedMatchSettings) => void,
}


interface IUseAppState {
  appState: IAppState
  setLoading : (arg: boolean) => void
}

interface IUseSavedMatchesState {
  savedMatches:ISavedMatch[]
  initSavedMatches : (matches : ISavedMatch[]) => void
  addCtxSavedMatch : (match : ISavedMatch) => void
  hideCtxSavedMatch : (match : ISavedMatch) => void
  showCtxSavedMatch : (match : ISavedMatch) => void
}

export const useSavedMatchOptions = () : IUseSavedMatchOptions => {
  const [savedMatchOptions, dispatch] = useReducer(reducers.savedMatchOptionsReducer, [])

  const initSavedMatchOptions = (matchOptions: ISavedMatchSettings[]) => dispatch({type: 'initSavedMatchOptions', payload: matchOptions})
  const addSavedMatchOption = (matchOption: ISavedMatchSettings) => dispatch({type: 'addSavedMatchOption', payload: matchOption})
  const showCtxSavedMatchOption = (matchOption: ISavedMatchSettings) => dispatch({type: 'showSavedMatchOption', payload: matchOption})
  const hideCtxSavedMatchOption = (matchOption: ISavedMatchSettings) => dispatch({type: 'hideSavedMatchOption', payload: matchOption})
  const deleteCtxSavedMatchOption = (matchOption: ISavedMatchSettings) => dispatch({type: 'deleteSavedMatchOption', payload: matchOption})

  return { savedMatchOptions, initSavedMatchOptions, addSavedMatchOption, showCtxSavedMatchOption, hideCtxSavedMatchOption, deleteCtxSavedMatchOption }
}

export const usePriceTickers = () : IUsePriceTickers => {
  const [tickers, dispatch] = useReducer(reducers.priceTickersReducer, initialTickers)

  const populateTickers = (apiTickers) => dispatch({type: 'populatePriceTickers', payload: apiTickers})

  return { tickers, populateTickers }
}

export const usePriceMatches = () : IUsePriceMatches => { 
  const [matches, dispatch] = useReducer(reducers.priceMatchesReducer, initialMatches)

  const setMatches = (apiMatches : [IMatch, IMatch][]) => dispatch({type: 'addPriceMatches', payload: apiMatches})

  return { matches, setMatches }
}

export const useMatchOptions = () : IUsePriceOptions => { 
  const [matchOptions, dispatch] = useReducer(reducers.matchOptionsReducer, initialMatchOptions)

  const setMatchOptions = (options : Partial<IMatchSettings>) => dispatch({type: 'addMatchOptions', payload: options})

  return { matchOptions, setMatchOptions }
}

export const useSavedMatches = () : IUseSavedMatchesState => {
  const [savedMatches, dispatch] = useReducer(reducers.savedMatchesReducer, [])

  const initSavedMatches = (matches : ISavedMatch[]) => dispatch({type: 'initSavedMatches', payload: matches})
  const addCtxSavedMatch = (match : ISavedMatch) => dispatch({type: 'addSavedMatch', payload: match})
  const hideCtxSavedMatch = (match : ISavedMatch) => dispatch({type: 'hideSavedMatch', payload: match})
  const showCtxSavedMatch = (match : ISavedMatch) => dispatch({type: 'showSavedMatch', payload: match})

  return { savedMatches, initSavedMatches, addCtxSavedMatch, hideCtxSavedMatch, showCtxSavedMatch }
}

export const useAppState = () : IUseAppState => {
  const [appState, dispatch] = useReducer(reducers.appStateReducer, { loading: false })

  const setLoading = (loading: boolean) => dispatch({type: 'setLoading', payload: { loading }})

  return { appState, setLoading }
}