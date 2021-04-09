const electron = require('electron');
const url = require('url');
const path = require('path');
const { ipcRenderer } = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow, newWindow
let todoList = []

app.on("ready", () => {

    mainWindow = new BrowserWindow({
        webPreferences: {               // https://stackoverflow.com/a/55908510
            nodeIntegration: true,
            contextIsolation: false,
        },
        // frame: false
    })

    mainWindow.setResizable(false)

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "pages/mainWindow.html"),
            protocol: "file:",
            slashes: true
        })
    )

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(mainMenu)

    ipcMain.on("key:newTodoClose", () => {
        newWindow.close()
        newWindow = null
    })

    ipcMain.on("key:newTodoSave", (err, data) => {
        let todo = {
            id: todoList.length +1,
            value: data
        }
        todoList.push(todo)
        mainWindow.webContents.send("todo:addItem", todo)
        newWindow.close()
        newWindow = null
    })

    mainWindow.on("close", () => {
        app.quit()
    })
})

const mainMenuTemplate = [
    {
        label: "Dosya",
        submenu: [
            {
                label: "Yeni ekle",
                click() {
                    createWindow()
                }
            },
            {
                label: "Tümünü sil"
            },
            {
                label: "Çıkış",
                role: "quit",
                accelerator: process.platform == "darwin" ? "Command+q" : "Ctrl+q"
            }
        ]
    }
]

if (process.platform == "darwin") {
    mainMenuTemplate.unshift({
        label: app.getName(),
        role: "TODO"
    })
}

if (process.env.NODE_ENV !== "production") {
    mainMenuTemplate.push({
        label: "Dev Tools",
        submenu: [
            {
                label: "Geliştirici Penceresini Aç / Kapat",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools()
                }
            },
            {
                label: "Yenile",
                role: "reload"
            }
        ]
    })
}


function createWindow() {
    newWindow = new BrowserWindow({
        webPreferences: {               // https://stackoverflow.com/a/55908510
            nodeIntegration: true,
            contextIsolation: false,
        },
        width: 472,
        height: 172,
        title: "Yeni TODO Ekle",
        frame: false
    })
    newWindow.setResizable(false)
    newWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "pages/newTodo.html"),
            protocol: "file:",
            slashes: true
        })
    )

    newWindow.on("close", () => {
        newWindow = null
    })
}