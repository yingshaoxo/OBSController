import { useEffect, useRef, useState } from 'react'
import { Button } from '../Button'
import { Container, Text } from './styles'

function sendHTTPRequest(url: string) {
  return fetch(url).then(res => res.json())
}

export function Greetings() {
  // const videoReference = useRef(null)

  const [paused, setPaused] = useState(false)

  // const { remote } = require('electron');
  // const mainProcess = remote.require('./main.js');

  useEffect(() => {

    const asyncFunction = async () => {
    }

    asyncFunction()

    return () => {
    }
  }, [])


  return (
    <Button
      className="draggable"
      style={
        {
          backgroundColor: paused ? '#ff0000' : '#00ff00',
          opacity: 0.4,
        }
      }
      onClick={() => {
        (async () => {
          if (paused) {
            // ipcRenderer.sendSync('resumeOBSrecording', {});
            sendHTTPRequest('http://localhost:52000/resume')
            setPaused(false)
          } else {
            // ipcRenderer.sendSync('pauseOBSrecording', {});
            sendHTTPRequest('http://localhost:52000/pause')
            setPaused(true)
          }
        })()
      }}>{paused ? 'Resume' : 'Pause'}</Button>
  )
}



      // {/* <video
      //   ref={videoReference}
      //   style={{
      //     display: "none"
      //   }
      //   }></video> */}
