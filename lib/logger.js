/* ================================================================
 * macaca-chrome by zenzhu(zic.zhu[at]gmail.com)
 *
 * ================================================================
 * Copyright zenzhu
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

const path = require('path');
const logger = require('xlogger');
const options = {
  logFileDir: path.join(__dirname, '..', '..', 'logs')
};

module.exports = logger.Logger(options);
