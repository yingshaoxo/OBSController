import { app, BrowserWindow, ipcMain } from 'electron'
var child = require('child_process').execFile;

const path = require('path');

var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

// const serviceExePath = path.join(__dirname, "assets", "service.exe");
const serviceExePath = "/Users/yingshaoxo/CS/OBSfunnyMaker/assets/service.exe";
setTimeout(() => {
  myConsole.log(serviceExePath);
  child(serviceExePath, [], (err, stdout, stderr) => {
    if (err) {
      myConsole.log(err);
      return;
    }
    myConsole.log(stdout);
    myConsole.log(stderr);
  });
}, 1000);

function createWindow() {
  const { screen } = require('electron')
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize

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
      nodeIntegration: false,
      contextIsolation: true,
      // enableRemoteModule: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    }
  })

  mainWindow.setAlwaysOnTop(true, "screen-saver")
  mainWindow.setVisibleOnAllWorkspaces(true)

  // mainWindow.maximize()
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

app.on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
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
