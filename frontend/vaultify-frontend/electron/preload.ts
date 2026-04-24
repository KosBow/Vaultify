import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("vaultify", {
  platform: process.platform,
});