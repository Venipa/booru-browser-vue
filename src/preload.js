import { ipcRenderer } from 'electron';

require('dotenv').config();

window.ipcRenderer = ipcRenderer;
window.env = process.env;