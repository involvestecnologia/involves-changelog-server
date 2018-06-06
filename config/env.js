const path = require('path');

/**
* @see https://github.com/motdotla/dotenv#usage
*/
if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: path.resolve(__filename, '../../.env.test') });
} if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__filename, '../../.env') });
}

const ChangelogStoreEnv = require('involves-changelog-store/config/env');

/**
 * @class Env
 */
class Env extends ChangelogStoreEnv {
  /**
   * @default 3000
   * @return {Number}
   */
  static get PORT() {
    return process.env.PORT || 3000;
  }

  /**
   * @default 'dev'
   * @return {String}
   */
  static get HTTP_LOG_CONFIG() {
    return process.env.HTTP_LOG_CONFIG || 'dev';
  }
}

module.exports = Env;
