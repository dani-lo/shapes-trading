import React from 'react'

import { useSTContext } from '@component/provider'

import * as STElement from '@styled/index'

export const LoadingComponent = () : JSX.Element => {
  return <STElement.STSubTitle className="padding">Loading Data, this may take a bit ...</STElement.STSubTitle>
}
// eslint-disable-next-line react/display-name
export const WithLoading = (BaseComponent :  (p : unknown) => JSX.Element)  => (props : unknown) : JSX.Element => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { appState } = useSTContext()
  
  if (appState.loading) {
    return <LoadingComponent />
  }

  return <BaseComponent 
    {...props}
  />
}