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
  let cmd = '';
  if (_.platform.isOSX) {
    cmd = 'ps -ef | grep -i Chrome | grep -v grep  | grep -e \'remote-debugging-port\' | awk \'{ print $2 }\' | xargs kill -15';
  } else if (_.platform.isLinux) {
    cmd = 'ps -ef | grep -i Chrome | grep -v grep  | grep -e \'remote-debugging-port\' | awk \'{ print $2 }\' | xargs -r kill -15';
  }
  return _.exec(cmd);
};

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
  return Promise.all([this.chromedriver.stop(), this.killChrome()]);
};

module.exports = Chrome;
