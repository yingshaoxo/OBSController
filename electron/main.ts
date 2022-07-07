import { app, BrowserWindow, dialog, ipcMain, Tray } from 'electron'
import { env } from 'process';

import OBSWebSocket from 'obs-websocket-js';

const path = require('path');

const nodeConsole = require('console');
const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

const showAvator = env.showAvator
myConsole.log("\n\nthe Code: " + showAvator + "\n\n");

const obs = new OBSWebSocket();

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath()


const preConnection = async ()=> {
  await obs.connect(
    {address: 'localhost:4444', password: "highhighlife"}
  ).catch((e) => {
    console.log(e)
  })
}

const checkIfOnline = async () => {
  try {
    await preConnection()
  } catch {

  }

  try {
    await obs.send('GetRecordingStatus',)
    return true
  } catch {
    return false
  }
}

const pauseVideo = async () => {
  await obs.send(
    'PauseRecording',
    undefined
  ).catch((e) => {
    console.log(e)
  })
}

const resumeVideo = async ()=> {
  await obs.send('StartRecording', undefined).catch((e)=>{
    console.log(e)
  })
  await obs.send('ResumeRecording', undefined).catch((e) => {
    console.log(e)
  })
}

let recordingIsOn = false;

const onIconPath = path.join(assetsPath, 'assets', 'on-28x28.png')
const offIconPath = path.join(assetsPath, 'assets', 'off-28x28.png')
const appIconPath = path.join(assetsPath, 'assets', 'icon.icns')
let tray: Tray | null = null
function setIcon() {
  const iconPath = offIconPath
  tray = new Tray(iconPath)
  tray.setToolTip('This is the avator app created by yingshaoxo.')
  tray.setIgnoreDoubleClickEvents(true)


  tray.on('click', async (e) => {
    if (!await checkIfOnline()) {
      const options  = {
        buttons: ["OK"],
        message: "Can't connect to OBS, did you open it?",
        icon: appIconPath
      }
      dialog.showMessageBox(options)
      return
    }

    if (recordingIsOn) {
      await pauseVideo()
      tray?.setImage(offIconPath)
      recordingIsOn = false;
    } else {
      await resumeVideo()
      tray?.setImage(onIconPath)
      recordingIsOn = true;
    }
  });

  tray.on('right-click', async (e) => {
    try {
      const { recordingFilename='' } = await obs.send('GetRecordingStatus',)
      if (recordingFilename !== '') {
        const theFolder = require('path').dirname(recordingFilename);
        const {clipboard} = require('electron');
        const string = `open '${theFolder}'`
        clipboard.writeText(string);

        const options  = {
          buttons: ["OK"],
          message: `Copid:\n\n${string}`,
          icon: appIconPath
        }
        dialog.showMessageBox(options)
      }
    } catch {
    }
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 300,
    x: 0,
    y: 0,
    icon: appIconPath,
    transparent: true,
    frame: false,
    resizable: true,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  mainWindow.setVisibleOnAllWorkspaces(true)

  mainWindow.maximize()

  myConsole.log(MAIN_WINDOW_WEBPACK_ENTRY)
  if (showAvator === "1") {
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  } else {
    // mainWindow.loadURL("http://baidu.com")
    mainWindow.setSize(1, 1)
    mainWindow.minimize()
  }

  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })

}

async function registerListeners() {
  ipcMain.on('message', (_, message) => {
    console.log(message)
  })

  await obs.connect(
    {address: 'localhost:4444', password: "highhighlife"}
  ).catch((e) => {
    console.log(e)
  })
}


app.on('ready', () => {
  setIcon()
  createWindow()
})
  .whenReady()
  .then(() => {
    registerListeners()
  })
  .catch(e => console.error(e))

app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    await obs.disconnect()
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.on('log', (event, arg) => {
  myConsole.log("hhhhhhhh");
})


ipcMain.on('max_window', (event, arg) => {
  mainWindow?.maximize()
  mainWindow?.setAlwaysOnTop(false, "screen-saver")
})


ipcMain.on('reset_window', (event, arg) => {
  mainWindow?.unmaximize()
  mainWindow?.setAlwaysOnTop(true, "screen-saver")
})

ipcMain.on('reload_it', (event, arg) => {
  mainWindow?.reload()
})
