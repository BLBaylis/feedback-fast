/* eslint-disable global-require */
// eslint-disable-next-line no-cond-assign
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
