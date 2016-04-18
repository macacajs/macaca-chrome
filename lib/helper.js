/* ================================================================
 * macaca-ios by zenzhu(zic.zhu[at]gmail.com)
 *
 * first created at : Tue Mar 17 2015 00:16:10 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright zenzhu
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

const macacaUtils = require('macaca-utils');
const childProcess = require('child_process');

var _ = macacaUtils.merge({}, macacaUtils);

_.exec = function(cmd, opts) {
  return new Promise(function(resolve, reject) {
    childProcess.exec(cmd, _.merge({
      maxBuffer: 1024 * 512,
      wrapArgs: false
    }, opts || {}), function(err, stdout, stderr) {
      if (err) {
        return reject(err);
      }
      resolve(_.trim(stdout));
    });
  });
};

module.exports = _;
