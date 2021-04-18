import { useReducer } from 'react'

export const CrudStore = <T> (
  store: unknown, 
  name : string, 
  reducer: (state: T[], action: {type: string, payload: T | T[]}) => T[], 
  dataDefault : T[]
  ) : void=> {
  
  const [saved, dispatch] = useReducer(reducer, dataDefault)

  store[name] = {
    data: saved,
    init: (payload) => {
      dispatch({
        type: 'init', 
        payload
      })
    },
    add: (payload) => {

      dispatch({
        type: 'add', 
        payload
      })
      //store[name].data = saved
    },
    hide: (payload) => {

      dispatch({
        type: 'hide', 
        payload
      })
      //store[name].data = saved
    },
    show: (payload) => {

      dispatch({
        type: 'show', 
        payload
      })
      //store[name].data = saved
    },
    delete: (payload) => {

      dispatch({
        type: 'delete', 
        payload
      })
      //store[name].data = saved
    }
  }
}


