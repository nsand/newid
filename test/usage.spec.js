var tape = require('tape');
var usage = require('../lib/usage');

tape.test('Make sure there is a usage function', function (assert) {
	assert.equal(typeof usage, 'function');
	assert.end();
});
