const electron = require('electron');
const { ipcRenderer } = electron;

ipcRenderer.on("todo:addItem", (err, data) => {
    console.log(data);
})