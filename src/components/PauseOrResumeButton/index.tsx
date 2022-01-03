import { useEffect, useRef, useState } from 'react'
import { Button } from '../Button'

function sendHTTPRequest(url: string) {
  return fetch(url).then(res => res.json())
}

function log(message: string) {
  const ipcRenderer = window?.Main.getIpcRenderer()
  console.log(ipcRenderer)
  ipcRenderer.sendSync('log', message)
}

function max_window() {
  const ipcRenderer = window?.Main.getIpcRenderer()
  ipcRenderer.sendSync('max_window')
}

function reset_window() {
  const ipcRenderer = window?.Main.getIpcRenderer()
  ipcRenderer.sendSync('reset_window')
}

function reloadPage() {
  const ipcRenderer = window?.Main.getIpcRenderer()
  ipcRenderer.sendSync('reload_it')
}

function checkIfScreenWidthIsGreaterThan(width: number) {
  return window?.innerWidth > width
}

export function PauseOrResumeButton() {
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
          // opacity: 0.4,
        }
      }
      onContextMenu={() => {
        // if (checkIfScreenWidthIsGreaterThan(600)) {
        //   reset_window()
        // } else {
        //   max_window()
        // }
        // reloadPage()
      }}
      onDoubleClick={() => {
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