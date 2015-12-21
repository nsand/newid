var tape = require('tape');

tape.test('transformer - should be a function', function (assert) {
	assert.equals(typeof require('../lib/transformer'), 'function');
	assert.end();
});

tape.test('transformer - should return a templating function', function (assert) {
	assert.equals(typeof require('../lib/transformer')(), 'function');
	assert.end();
});

tape.test('transformer - should return unmodified file without a template', function (assert) {
	var transformer = require('../lib/transformer')();
	assert.equals(transformer('path/to/file.txt'), 'path/to/file.txt');
	assert.end();
});

tape.test('transformer - should modify the filename based on the template with variables', function (assert) {
	var transformer = require('../lib/transformer')('{basename}.{extname}.old');
	assert.equals(transformer('path/to/file.txt'), 'path/to/file.txt.old');
	assert.end();
});

tape.test('transformer - should modify the filename based on the template', function (assert) {
	var transformer = require('../lib/transformer')('different.name');
	assert.equals(transformer('path/to/file.txt'), 'path/to/different.name');
	assert.end();
});
