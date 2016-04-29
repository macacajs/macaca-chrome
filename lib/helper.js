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
      resolve(_.trim([stdout, stderr]));
    });
  });
};

module.exports = _;
