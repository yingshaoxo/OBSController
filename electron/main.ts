import { app, BrowserWindow, ipcMain, Menu, MenuItem, Tray, net } from 'electron'
const child = require('child_process').execFile;

const path = require('path');

const nodeConsole = require('console');
const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath()


function sendHTTPRequest(url: string) {
  const request = net.request(url)
  request.on('response', (response) => {
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`)
    })
    response.on('end', () => {
      console.log('No more data in response.')
    })
    response.on('error', (error: any) => {
      console.log(`ERROR: ${JSON.stringify(error)}`)
    })
  })
  request.end()
}

// const serviceExePath = path.join(__dirname, "assets", "service.exe");
// const serviceExePath = "/Users/yingshaoxo/CS/OBSfunnyMaker/assets/service.exe";
// setTimeout(() => {
//   myConsole.log(serviceExePath);
//   child(serviceExePath, [], (err: any, stdout: any, stderr: any) => {
//     if (err) {
//       myConsole.log(err);
//       return;
//     }
//     myConsole.log(stdout);
//     myConsole.log(stderr);
//   });
// }, 1000);


let recordingIsOn = false;

const onIconPath = path.join(assetsPath, 'assets', 'on-28x28.png')
const offIconPath = path.join(assetsPath, 'assets', 'off-28x28.png')
let tray: Tray | null = null
function setIcon() {
  // app.dock.hide()

  const iconPath = offIconPath
  tray = new Tray(iconPath)
  // const contextMenu = Menu.buildFromTemplate([
  //   { label: 'Info' },
  //   { label: 'Quit' },
  // ])
  // tray.setContextMenu(contextMenu)
  tray.setToolTip('This is the avator app created by yingshaoxo.')
  tray.setIgnoreDoubleClickEvents(true)


  tray.on('click', function (e) {
    if (recordingIsOn) {
      sendHTTPRequest('http://localhost:8000/obs/stop_script')
      sendHTTPRequest('http://localhost:8000/obs/pause')
      tray?.setImage(offIconPath)
      recordingIsOn = false;
    } else {
      sendHTTPRequest('http://localhost:8000/obs/start')
      sendHTTPRequest('http://localhost:8000/obs/resume')
      tray?.setImage(onIconPath)
      recordingIsOn = true;
    }
  });

  tray.on('right-click', function (e) {
    if (recordingIsOn) {
      //sendHTTPRequest('http://localhost:52000/pause')
      sendHTTPRequest('http://localhost:8000/obs/stop_script')
      sendHTTPRequest('http://localhost:8000/obs/pause')
      tray?.setImage(offIconPath)
      tray?.setImage(offIconPath)
      recordingIsOn = false;
    } else {
      //sendHTTPRequest('http://localhost:52000/resume')
      sendHTTPRequest('http://localhost:8000/obs/start_script')
      tray?.setImage(onIconPath)
      recordingIsOn = true;
    }
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 600,
    height: 300,
    x: 0,
    y: 0,
    transparent: true,
    frame: false,
    resizable: true,
    hasShadow: false,
    // backgroundColor: '#00ff00',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })


  // mainWindow.setAlwaysOnTop(true, "screen-saver")
  mainWindow.setVisibleOnAllWorkspaces(true)
  // mainWindow.setIgnoreMouseEvents(true)

  mainWindow.maximize()
  // mainWindow.loadURL("http://localhost:8000/")

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })

}

async function registerListeners() {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message)
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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
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
