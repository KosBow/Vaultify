const { contextBridge, ipcRenderer } = require("electron");


const validSendChannels = ["save-data", "load-data", "delete-data"];
const validReceiveChannels = ["data-saved", "data-loaded", "data-deleted"];

contextBridge.exposeInMainWorld("api", {
  // Säker sändning från renderer → main
  send: (channel, data) => {
    if (validSendChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    } else {
      console.warn(`Blocked IPC send on invalid channel: ${channel}`);
    }
  },

  // Säker mottagning från main → renderer
  receive: (channel, callback) => {
    if (validReceiveChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
    } else {
      console.warn(`Blocked IPC receive on invalid channel: ${channel}`);
    }
  },
});
