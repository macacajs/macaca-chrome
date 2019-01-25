'use strict';

const assert = require('assert');

const Chrome = require('../lib/macaca-chrome');

describe('test', function() {
  this.timeout(5 * 60 * 1000);

  const chrome = new Chrome();
  before(async function () {
    await chrome.startDevice({
      browserName: 'chrome'
    });
  });

  it('should be ok', function () {
    assert.ok(chrome);
  });

  it('proxy command', async function () {
    const status = await chrome.proxyCommand('/status', 'GET');
    assert.equal(status.status, 0);
  });

  after(async function () {
    chrome.stopDevice();
  });
});
