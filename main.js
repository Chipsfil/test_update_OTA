const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

let mainWindow;

// Create main window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.loadFile('index.html');

  // Uncomment the line below to open DevTools for debugging
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Initialize updater
function initUpdater() {
  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on('update-available', () => {
    console.log('Update available');
    mainWindow.webContents.send('update-available');
  });

  autoUpdater.on('update-downloaded', () => {
    console.log('Update downloaded');
    mainWindow.webContents.send('update-downloaded');
  });

  autoUpdater.on('error', (err) => {
    console.error('Update error:', err);
    mainWindow.webContents.send('update-error', err.message);
  });
}

app.on('ready', () => {
  createWindow();
  initUpdater();
  createMenuBar();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC handlers for update control
ipcMain.on('install-update', () => {
  autoUpdater.quitAndInstall();
});

ipcMain.on('check-for-update', () => {
  autoUpdater.checkForUpdates();
});

ipcMain.handle('get-version', () => {
  return app.getVersion();
});

// Create menu bar
function createMenuBar() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: () => {
            console.log('About clicked');
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
