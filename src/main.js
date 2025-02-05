import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
    app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

app.commandLine.appendSwitch('remote-debugging-port', '6789');
app.commandLine.appendSwitch('remote-allow-origins', 'http://localhost:6789');
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1');
app.commandLine.appendSwitch('disable-pinch');
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
app.commandLine.appendSwitch('force_high_performance_gpu');
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-accelerated-video');
app.commandLine.appendSwitch('enable-accelerated-video-decode');
app.commandLine.appendSwitch('use-gl', 'desktop');
app.commandLine.appendSwitch('enable-features', 'VaapiVideoDecoder');

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        frame: false,
        //enableLargerThanScreen: true, DON'T DO THIS! SEE ABOVE.
        //width : ...                   DON'T DO THIS! SEE ABOVE.
        //height: ...                   DON'T DO THIS! SEE ABOVE.
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            preload: path.join(__dirname, 'preload.js'),
        },
        allowRunningInsecureContent: true,
    });

    console.log('dev server url', MAIN_WINDOW_VITE_DEV_SERVER_URL);
    console.log('main window vite name', MAIN_WINDOW_VITE_NAME);

    mainWindow.setMenu(null);

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    }

    mainWindow.on('closed', function () {
        console.log('window closed', MAIN_WINDOW_VITE_NAME);
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
};

app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
