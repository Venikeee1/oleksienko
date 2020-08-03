const devConfig = require('./config/config.dev');
const prodConfig = require('./config/config.prod');

const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction, 'isProduction');
const config = isProduction
  ? prodConfig
  : devConfig

  module.exports = {
    config,
    isProduction
  }
  