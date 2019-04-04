import { module, test } from 'qunit';
import RFB from '@novnc/novnc/core/rfb';
import * as Log from '@novnc/novnc/core/util/logging';
import Websock from '@novnc/novnc/core/websock';

module('Unit | novnc exports', () => {
  test('exports RFB', assert => {
    assert.equal(typeof RFB, 'function');
  });

  test('exports Log', assert => {
    assert.equal(typeof Log.Debug, 'function', 'Log.Debug');
    assert.equal(typeof Log.Info, 'function', 'Log.Info');
    assert.equal(typeof Log.Warn, 'function', 'Log.Warn');
    assert.equal(typeof Log.Error, 'function', 'Log.Error');
  });

  test('exports Websock', assert => {
    assert.equal(typeof Websock, 'function');
  });
});
