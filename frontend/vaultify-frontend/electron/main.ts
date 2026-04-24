import { app, BrowserWindow, shell } from "electron";
import { spawn, ChildProcess } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV === "development";

let backendProcess: ChildProcess | null = null;
let mainWindow: BrowserWindow | null = null;

function startBackend() {
  const exeName = process.platform === "win32" ? "Vaultify.Api.exe" : "Vaultify.Api";
  const exePath = isDev
    ? path.join(__dirname, "../../backend/Vaultify.Api/bin/Debug/net9.0", exeName)
    : path.join(process.resourcesPath, "backend", exeName);

  try {
    backendProcess = spawn(exePath, [], {
      detached: false,
      stdio: "ignore",
      cwd: path.dirname(exePath),
    });

    backendProcess.on("error", (err) => {
      console.error("Backend failed to start:", err.message);
    });
  } catch (err) {
    console.error("Could not launch backend:", err);
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: "Vaultify",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false,
    },
  });

  mainWindow.setMenuBarVisibility(false);

  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  startBackend();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (backendProcess) {
    backendProcess.kill();
    backendProcess = null;
  }
  if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", () => {
  if (backendProcess) {
    backendProcess.kill();
    backendProcess = null;
  }
});