const {app, BrowserWindow} = require('electron');
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({width: 1600, height: 900});
    mainWindow.loadFile('index.html');
    //mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});