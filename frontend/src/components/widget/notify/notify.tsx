import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

interface Msg {
  started: number;
  txt: string;
  type: 'success' | 'error' | 'danger'
}

const StyledNotification = styled.div<{ msg: Msg}>`
  padding: 1rem;
`

let interval

// eslint-disable-next-line react/display-name
export const WithNotify = (Component) => (props) =>{
  // eslint-disable-next-line
  const [ msgs, setMsgs ] = useState<Msg[]>([])
  // eslint-disable-next-line
  useEffect(() => {
    if (msgs.length && !interval) {
      interval = setInterval(() => {
        const now = new Date().getTime()


        const toDelete = msgs.reduce((acc, msg) => {

          if (now - msg.started > 4000) {
            acc.push(msg.started)
          }
          return acc
        }, [])

        if (toDelete.length) {
          const newMsgs = msgs.reduce((acc, msg) => {
            if (toDelete.indexOf(msg.started) === -1) {
              acc.push(msg)
            }
            return acc
          }, [])
          
          setMsgs(newMsgs)
        }
      }, 500); 
    } else {
      clearInterval(interval) 

      interval = false
    }
    return () => clearInterval(interval)
  }, [msgs.length])

  const newProps = {
    ...props,
    notify: (txt, type) => {
      setMsgs([
        ...msgs,
        {
          started: new Date().getTime(),
          txt,
          type
        }
      ])
    }
  }
  if (msgs.length) {
    return <>
    {
      msgs.map((msg, i) => {
        return <StyledNotification msg={ msg } key={ i }>
          <p>{ msg.txt }</p>
      </StyledNotification>
      })
    }  
    <Component { ...newProps } />
    </>
  }

  return <Component { ...newProps } />
}