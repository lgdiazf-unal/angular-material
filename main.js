const {app,BrowserWindow} = require('electron');
const path = require("path");
const isDev = require("electron-is-dev");

let win;

function createWindow(){
    win = new BrowserWindow({
        width : 320,
        height : 359,
        backgroundColor:'#ffffff',
        webPreferences: {
            nodeIntegration: true,
            preload: __dirname + "\\preload.js"
          }
    })

    win.loadURL(
        isDev ? "http://localhost:4200/" :
        `file://${path.join(__dirname,"dist","angular-material","index.html")}`
    );

    //wind.webContents.openDevTools();

    win.on('close',function(){
        win = null
    })
}
app.on('ready',createWindow);
app.on('window-all-closed',function(){
    if(process.platform !== 'darwin'){
        app.quit()
    }
})
app.on('activate',function(){
    if (win === null){
        createWindow()
    }
})