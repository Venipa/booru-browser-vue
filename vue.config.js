const path = require('path');

/**
 * @type {import('electron-builder').AfterPackContext} electronBuilder
 */
 const electronBuilder = {
  chainWebpackMainProcess: (config) => {},
  mainProcessTypeChecking: true,
  preload: 'src/preload.js',
  nodeIntegration: false,
  nodeModulesPath: ["./node_modules"],
};
module.exports = {
  pluginOptions: {
    electronBuilder
  },
};