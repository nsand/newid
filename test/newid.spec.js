var tape = require('tape');

var newid = require('../lib/newid'),
	transformer = require('../lib/transformer');

tape.test('newid - should provide a default transformer', function (assert) {
	assert.equals(typeof newid.transformer, 'function');
	assert.end();
});

tape.test('newid - should have the same output as provided transformer', function (assert) {
	var transformer = require('../lib/transformer')('{basename}.{extname}.old');
	assert.equals(transformer('path/to/file.txt'), newid.transformer('{basename}.{extname}.old')('path/to/file.txt'));
	assert.end();
});
