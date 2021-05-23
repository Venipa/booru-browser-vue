const path = require('path');

module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
    },
  },
};