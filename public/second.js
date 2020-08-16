const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.on('MainWindowMessage', (event, arg) => {
    console.log(event, arg)
    document.getElementById('message').innerHTML = arg
  })
})
