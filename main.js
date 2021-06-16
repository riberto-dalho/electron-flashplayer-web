// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");
var __dirname = path.resolve();

let pluginName;

switch (process.platform) {
  case "win32":
    pluginName = "pepflashplayer.dll";
    break;
  case "x64":
    pluginName = "pepflashplayer.dll";
    break;
  case "darwin":
    pluginName = "plugins/PepperFlashPlayer.plugin";
    break;
  case "linux":
    pluginName = "plugins/libpepflashplayer.so";
    break;
}

app.commandLine.appendSwitch(
  "ppapi-flash-path",
  path.join(__dirname, pluginName)
);

// app.commandLine.appendSwitch(
//   "ppapi-flash-path",
//   __dirname + "\\pepflashplayer.dll"
// );

// Optional: Specify flash version, for example, v17.0.0.169
//app.commandLine.appendSwitch("ppapi-flash-version", "17.0.0.169");

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      plugins: true,
    },
  });

  console.log(path.join(process.cwd(), "pepflashplayer.dll"));
  win.loadURL(`http://degust.com.br/novo/`);
  // Something else
});

// function createWindow() {
//   // Create the browser window.
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, "preload.js"),
//     },
//   });

//   // and load the index.html of the app.
//   mainWindow.loadURL("http://degust.com.br/novo/");

//   // Open the DevTools.
//   // mainWindow.webContents.openDevTools()
// }

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.getPath("pepperFlashSystemPlugin");

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
