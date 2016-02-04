var tape = require('tape');

var slugify = require('../lib/slugify');

tape.test('slugify - should not change a sluggified string', function (assert) {
	assert.equals(slugify('hello'), 'hello');
  assert.equals(slugify('hello-there'), 'hello-there');
	assert.end();
});

tape.test('slugify - should trim any leading/trailing whitespace', function (assert) {
	assert.equals(slugify('\t hello \t\n'), 'hello');
	assert.end();
});

tape.test('slugify - should convert to lowercase', function (assert) {
	assert.equals(slugify('HelloThere'), 'hellothere');
	assert.end();
});

tape.test('slugify - should replace multiple occurrences with one hyphen', function (assert) {
	assert.equals(slugify('this   has --- multiple spaces'), 'this-has-multiple-spaces');
	assert.end();
});

tape.test('slugify - should remove non-alphanumeric characters', function (assert) {
	assert.equals(slugify('$this#has?additional\u21E8things'), 'thishasadditionalthings');
	assert.end();
});

tape.test('slugify - should replace international characters', function (assert) {
	assert.equals(slugify('àêîøùçžšñÿĝřłđßÞĥĵ'), 'aeiouczsnygrldssthhj');
	assert.end();
});
