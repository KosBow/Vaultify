const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 700,
    title: "Receipt & Warranty Manager",
    autoHideMenuBar: true,

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),

      // 🔐 Säkerhetsinställningar
      nodeIntegration: false,      // React får INTE använda Node direkt
      contextIsolation: true,      // Renderer hålls isolerad från preload
      sandbox: true,               // Extra sandbox för renderer
      enableRemoteModule: false,   // Förhindrar Remote API (deprecated & farligt)
    },
  });

  win.loadURL("http://localhost:3000");
}

app.whenReady().then(() => {
  createWindow();
});
