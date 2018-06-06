const path = require('path');

/**
* @see https://github.com/motdotla/dotenv#usage
*/
if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: path.resolve(__filename, '../../.env.test') });
} if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__filename, '../../.env') });
}

/**
 * @class Env
 */
class Env {
  /**
   * Application context.
   *
   * @default 'development'
   * @return {String}
   */
  static get NODE_ENV() {
    return process.env.NODE_ENV || 'development';
  }

  static get HTTP_LOG_CONFIG() {
    return process.env.HTTP_LOG_CONFIG || 'dev';
  }

  static get PORT() {
    return process.env.PORT || 3000;
  }
}

module.exports = Env;
