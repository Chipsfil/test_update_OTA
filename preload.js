const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  // Send IPC messages
  installUpdate: () => ipcRenderer.send('install-update'),
  checkForUpdate: () => ipcRenderer.send('check-for-update'),
  
  // Invoke IPC handlers
  getVersion: () => ipcRenderer.invoke('get-version'),
  
  // Listen for updates
  onUpdateAvailable: (callback) => ipcRenderer.on('update-available', callback),
  onUpdateDownloaded: (callback) => ipcRenderer.on('update-downloaded', callback),
  onUpdateError: (callback) => ipcRenderer.on('update-error', (_event, message) => callback(message)),
});
