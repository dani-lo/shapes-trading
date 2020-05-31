import { ITicker, IStoreAction, IMatch } from '@alltypes/types'

export const priceTickersReducer = (
  state:  ITicker[], 
  action : IStoreAction<string[]> ) : ITicker[] => {

  if (action.type == 'populatePriceTickers') {

    return action.payload.map(ticker => {
      return {
        name: ticker.substring(0, ticker.indexOf('_')),
        value: ticker
      }
    })
  }

  return state
}

export const priceMatchesReducer = (
  state : IMatch[], 
  action: IStoreAction<IMatch[]>) : IMatch[] => {

  if (action.type == 'addPriceMatches') {
    return action.payload.map(matchPriceitem => {
      return matchPriceitem
    })
  }
  return state
}


