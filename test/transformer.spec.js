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

tape.test('transformer - should replace the {index} parameter', function (assert) {
	var transformer = require('../lib/transformer')('{index}.foo');
	assert.equals(transformer('path/to/file.txt', 100), 'path/to/100.foo');
	assert.end();
});

tape.test('transformer - should not replace unknown parameters', function (assert) {
	var transformer = require('../lib/transformer')('{basename}{foo}.{bar}');
	assert.equals(transformer('path/to/file.txt'), 'path/to/file{foo}.{bar}');
	assert.end();
});

var timeRx = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}/;

tape.test('transformer - should replace atime placeholder', function (assert) {
	var transformer = require('../lib/transformer')('{atime}');
	assert.ok(timeRx.test(transformer('package.json')));
	assert.end();
});

tape.test('transformer - should replace ctime placeholder', function (assert) {
	var transformer = require('../lib/transformer')('{ctime}');
	assert.ok(timeRx.test(transformer('package.json')));
	assert.end();
});

tape.test('transformer - should replace mtime placeholder', function (assert) {
	var transformer = require('../lib/transformer')('{mtime}');
	assert.ok(timeRx.test(transformer('package.json')));
	assert.end();
});

tape.test('transformer - should replace birthtime placeholder', function (assert) {
	var transformer = require('../lib/transformer')('{birthtime}');
	assert.ok(timeRx.test(transformer('package.json')));
	assert.end();
});

tape.test('transformer - should format time placeholders', function (assert) {
	var transformer = require('../lib/transformer')('{atime | YYYY}');
	assert.ok(/\d{4}/.test(transformer('package.json')));

	transformer = require('../lib/transformer')('{atime|YYYY}');
	assert.ok(/\d{4}/.test(transformer('package.json')));

	transformer = require('../lib/transformer')('{atime | YYYY-[foobar]}');
	assert.ok(/\d{4}-foobar/.test(transformer('package.json')));
	assert.end();
});
