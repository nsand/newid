var tape = require('tape');

var opts = require('../lib/opts');

tape.test('opts - should parse a glob and template in that order', function (assert) {
	var options = opts(['**/*.js', '{basename}.{extname}.old']);
	assert.equal(options.pattern, '**/*.js');
	assert.equal(options.template, '{basename}.{extname}.old');
	assert.equal(0, Object.keys(options.flags).length);
	assert.end();
});

tape.test('opts - should support the force option', function (assert) {
	var options = opts(['--force', 'glob', 'template']);
	assert.equal(options.flags.force, true);
	assert.end();
});

tape.test('opts - should support the insensitive option', function (assert) {
	var options = opts(['--insensitive', 'glob', 'template']);
	assert.equal(options.flags.insensitive, true);
	assert.end();
});

tape.test('opts - should support the help option', function (assert) {
	var options = opts(['--help', 'glob', 'template']);
	assert.equal(options.flags.help, true);
	assert.end();
});

tape.test('opts - should support shorthand notation', function (assert) {
	var options = opts(['-f', 'glob', 'template']);
	assert.equal(options.flags.force, true);
	assert.end();
});

tape.test('opts - should support shorthand insensitive notation', function (assert) {
	var options = opts(['-i', 'glob', 'template']);
	assert.equal(options.flags.insensitive, true);
	assert.end();
});

tape.test('opts - should support shorthand help notation', function (assert) {
	var options = opts(['-h', 'glob', 'template']);
	assert.equal(options.flags.help, true);
	assert.end();
});

tape.test('opts - should support the slugify option', function (assert) {
	var options = opts(['--slugify', 'glob', 'template']);
	assert.equal(options.flags.slugify, true);
	assert.end();
});

tape.test('opts - should support the slugify shorthand', function (assert) {
	var options = opts(['-s', 'glob', 'template']);
	assert.equal(options.flags.slugify, true);
	assert.end();
});

tape.test('opts - should terminate parsing with invalid flags', function (assert) {
	var options = opts(['glob', 'template', '--nothing']);
	assert.equals(typeof options, 'undefined');
	assert.end();
});

tape.test('opts - should terminate parsing with invalid shorthand flags', function (assert) {
	var options = opts(['glob', 'template', '-a']);
	assert.equals(typeof options, 'undefined');
	assert.end();
});

tape.test('opts - should terminate parsing with invalid arguments', function (assert) {
	var options = opts(['glob', 'template', 'athirdthing']);
	assert.equals(typeof options, 'undefined');
	assert.end();
});
