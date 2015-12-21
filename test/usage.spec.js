var tape = require('tape');
var usage = require('../lib/usage');

tape.test('usage - should be a function function', function (assert) {
	assert.equal(typeof usage, 'function');
	assert.end();
});
