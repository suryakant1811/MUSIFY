const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const path = require('path');
//random
function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      contextIsolation: true,
    },
  });

  // Remove default menu bar
  Menu.setApplicationMenu(null);

  // Load your live MERN app
  
  win.loadURL('https://musify.devsurya.space');

  // Register keyboard shortcuts after the page loads
  win.webContents.on('did-finish-load', () => {
    globalShortcut.register('Alt+Left', () => {
      if (win.webContents.canGoBack()) {
        win.webContents.goBack();
      }
    });

    globalShortcut.register('Alt+Right', () => {
      if (win.webContents.canGoForward()) {
        win.webContents.goForward();
      }
    });
  });

  // Custom right-click context menu
  win.webContents.on('context-menu', () => {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '⬅ Back',
        enabled: win.webContents.canGoBack(),
        click: () => win.webContents.goBack(),
      },
      {
        label: '➡ Forward',
        enabled: win.webContents.canGoForward(),
        click: () => win.webContents.goForward(),
      },
      { type: 'separator' },
      { role: 'reload' },
      { role: 'toggleDevTools' },
    ]);

    contextMenu.popup();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


