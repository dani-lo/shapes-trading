import { ITicker, IStoreAction, IMatch, IMatchSettings, ISavedMatch, ISavedMatchSettings, IAppState } from '@alltypes/types'


export const priceTickersReducer = (
  state:  ITicker[], 
  action : {
    type: string,
    payload: ITicker | ITicker[]
  } ) : ITicker[] => {

  if (action.type == 'init' && Array.isArray(action.payload)) {
    return action.payload
  }

  return state
}

export const priceMatchesReducer = (
    state : [IMatch, IMatch][], 
    action: {
      type: string,
      payload:  [IMatch, IMatch][]
    }): [IMatch, IMatch][] => {

  if (action.type == 'init') {

    return action.payload.map(matchPriceitem => {
      return matchPriceitem
    })
  }
  return state
}

export const matchOptionsReducer = (
    state: IMatchSettings,
    action: IStoreAction<Partial<IMatchSettings>>) : IMatchSettings => {

  if (action.type == 'addMatchOptions') {
    return Object.assign({}, state, action.payload)
  }

  return state
}

export const savedMatchOptionsReducer = (
  state: ISavedMatchSettings[],
  action: IStoreAction<ISavedMatchSettings> | IStoreAction<ISavedMatchSettings[]>) : ISavedMatchSettings[] => {

  if (action.type == 'addSavedMatchOption' && !Array.isArray(action.payload)) {

    const stateOpts = [...state]

    stateOpts.push(action.payload)

    return stateOpts
  }

  if (action.type == 'initSavedMatchOptions' && Array.isArray(action.payload)) {
    return action.payload
  }

  if (action.type == 'showSavedMatchOption' && !Array.isArray(action.payload)) {
    const mId = action.payload._id

    const stateMatches = state.map((matchOpt) => {
      if (matchOpt._id === mId) {
        return {...matchOpt, visible: true}
      } else {
        return matchOpt
      }
    })
    return stateMatches
  }

  if (action.type == 'hideSavedMatchOption' && !Array.isArray(action.payload)) {
    const mId = action.payload._id

    const stateMatches = state.map((matchOpt) => {
      if (matchOpt._id === mId) {
        return {...matchOpt, visible: false}
      } else {
        return matchOpt
      }
    })
    return stateMatches
  }

  if (action.type == 'deleteSavedMatchOption' && !Array.isArray(action.payload)) {
    const mId = action.payload._id

    const stateMatches = state.map((matchOpt) => {
      if (matchOpt._id === mId) {
        return {...matchOpt, deleted: true}
      } else {
        return matchOpt
      }
    })
    return stateMatches
  }

  return state
}

export const savedMatchesReducer = (
  state: ISavedMatch[],
  action: IStoreAction<ISavedMatch | ISavedMatch[]>) : ISavedMatch[] => {

  if (action.type == 'initSavedMatches'  && Array.isArray(action.payload)) {
    return action.payload
  }

  if (action.type == 'addSavedMatch'  && !Array.isArray(action.payload)) {
    const stateMatches = [...state]
    
    stateMatches.push(action.payload)

    return stateMatches
  }

  if (action.type == 'hideSavedMatch' && !Array.isArray(action.payload)) {
    const mId = action.payload._id

    const stateMatches = state.map((match) => {
      if (match._id === mId) {
        return {...match, visible: false}
      } else {
        return match
      }
    })
    return stateMatches
  }

  if (action.type == 'showSavedMatch' && !Array.isArray(action.payload)) {
    const mId = action.payload._id

    const stateMatches = state.map((match) => {
      if (match._id === mId) {
        return {...match, visible: true}
      } else {
        return match
      }
    })
    return stateMatches
  }

  // if (action.type == 'deleteSavedMatchOption' && !Array.isArray(action.payload)) {
  //   const mId = action.payload._id

  //   const stateMatches = state.map((matchOpt) => {
  //     if (matchOpt._id === mId) {
  //       return {...matchOpt, deleted: true}
  //     } else {
  //       return matchOpt
  //     }
  //   })
  //   return stateMatches
  // }

  return state
}

export const appStateReducer = (
    state: IAppState,
    action : IStoreAction<Partial<IAppState>>) : IAppState => {
  
  if (action.type == 'setLoading') {
    return Object.assign({}, state, { loading: action.payload.loading })
  }

  return state
}


