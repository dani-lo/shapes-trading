import axios from 'axios'

import { IMatch, ISavedMatch, IMatchSettings, ISavedMatchSettings } from '@alltypes/types'

export const saveMatch = (matchData: [IMatch, IMatch]) : Promise<ISavedMatch> => {
  const baseUrl = process.env.API_URL

  return axios.post(`${ baseUrl }/save-match`, { matchData })
    .then(res => {
      const { data } = res.data
      
      return {
        _id: data,
        visible: true,
        matchData
      }
    })
}

export const saveMatchOptions = (matchSettings : IMatchSettings) : Promise<boolean> => {
  const baseUrl = process.env.API_URL

  return axios.post(`${ baseUrl }/save-match-options`, { matchSettings })
    .then(res => {
      const { data } = res.data
      
      return data.success
    })
}

export const fetchSavedMatches = () : Promise<ISavedMatch[]> => {
  const baseUrl = process.env.API_URL

  return axios.get(`${ baseUrl }/matches`)
    .then(res => {
      const { data } = res.data
      return data
    })
}


export const fetchSavedMatchOptions = () : Promise<ISavedMatchSettings[]> => {
  const baseUrl = process.env.API_URL

  return axios.get(`${ baseUrl }/match-options`)
    .then(res => {
      const { data } = res.data
      return data
    })
}




export const removeSavedMatch = (matchId : string) : Promise<string> => {
  const baseUrl = process.env.API_URL

  return axios.post(`${ baseUrl }/remove-saved-match`, { _id : matchId })
    .then(res => {
      const { data } = res.data

      return data
    })
}

export const showSavedMatch = (matchId : string) : Promise<ISavedMatch[]> => {
  const baseUrl = process.env.API_URL


  return axios.post(`${ baseUrl }/showhide-match`, { _id : matchId, hidden: false })
    .then(res => {
      const { data } = res.data
      return data
    })
}

export const hideSavedMatch = (matchId : string) : Promise<ISavedMatch[]> => {
  const baseUrl = process.env.API_URL


  return axios.post(`${ baseUrl }/showhide-match`, { _id : matchId, hidden: true })
    .then(res => {
      const { data } = res.data
      return data
    })
}

export const hideSavedMatchOption = (matchId : string) : Promise<boolean> => {
  const baseUrl = process.env.API_URL


  return axios.post(`${ baseUrl }/showhide-match-option`, { _id : matchId, hidden: true })
    .then(res => {
      const { success } = res.data
      return success
    })
}

export const showSavedMatchOption = (matchId : string) : Promise<boolean> => {
  const baseUrl = process.env.API_URL

  return axios.post(`${ baseUrl }/showhide-match-option`, { _id : matchId, hidden: false })
    .then(res => {
      const { success } = res.data
      return success
    })
}

export const deleteSavedMatchOption = (matchId : string) : Promise<boolean> => {
  const baseUrl = process.env.API_URL

  return axios.post(`${ baseUrl }/showhide-match-option`, { _id : matchId, deleted: true })
    .then(res => {
      const { success } = res.data
      return success
    })
}



