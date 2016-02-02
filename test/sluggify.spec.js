var tape = require('tape');

var sluggify = require('../lib/sluggify');

tape.test('sluggify - should not change a sluggified string', function (assert) {
	assert.equals(sluggify('hello'), 'hello');
  assert.equals(sluggify('hello-there'), 'hello-there');
	assert.end();
});

tape.test('sluggify - should trim any leading/trailing whitespace', function (assert) {
	assert.equals(sluggify('\t hello \t\n'), 'hello');
	assert.end();
});

tape.test('sluggify - should convert to lowercase', function (assert) {
	assert.equals(sluggify('HelloThere'), 'hellothere');
	assert.end();
});

tape.test('sluggify - should replace multiple occurrences with one hyphen', function (assert) {
	assert.equals(sluggify('this   has --- multiple spaces'), 'this-has-multiple-spaces');
	assert.end();
});

tape.test('sluggify - should remove non-alphanumeric characters', function (assert) {
	assert.equals(sluggify('$this#has?additional\u21E8things'), 'thishasadditionalthings');
	assert.end();
});

tape.test('sluggify - should replace international characters', function (assert) {
	assert.equals(sluggify('àêîøùçžšñÿĝřłđßÞĥĵ'), 'aeiouczsnygrldssthhj');
	assert.end();
});
