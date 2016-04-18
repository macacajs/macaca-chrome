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

const DriverBase = require('driver-base');
const ChromeDriver = require('macaca-chromedriver');

const _ = require('./helper');
const logger = require('./logger');

class Chrome extends DriverBase {
  constructor() {
    super();
    this.chromedriver = null;
  }
}

Chrome.prototype.whiteList = function() {
  return false;
};

Chrome.prototype.isProxy = function() {
  return true;
};

Chrome.prototype.proxyCommand = function(url, method, body) {
  return this.chromedriver.sendCommand(url, method, body);
};

Chrome.prototype.killChrome = function() {
  const cmd = `ps -ef | grep Chrome | grep -v grep  | grep -e 'remote-debugging-port' | awk '{ print $2 }' | xargs kill -15`; 
  return _.exec(cmd);
}

Chrome.prototype.startDevice = function(caps) {
  return new Promise((resolve, reject) => {
    this.chromedriver = new ChromeDriver();
    this.chromedriver.on(ChromeDriver.EVENT_READY, data => {
      logger.info(`chromedriver ready with: ${JSON.stringify(data)}`);
      resolve('');
    });
    this.chromedriver.on(ChromeDriver.EVENT_ERROR, err => {
      logger.debug(`chromedriver failed to start: ${err}`);
      reject(err);
    });
    this.chromedriver.start(caps);
  });
};

Chrome.prototype.stopDevice = function() {
  return Promise.all([this.chromedriver.killAll(), this.killChrome()]);
};

module.exports = Chrome;
