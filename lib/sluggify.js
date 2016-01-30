var TRIM_IRREGULAR_REGEX = /^\s+|[^a-z0-9 \-]|\s+$/g;
var SEPARATOR_REGEX = /[\s-]+/g;

/**
 * Converts the file name into a slug
 * @param {string} file the file name
 */
function sluggify(file) {
	'use strict';
	var file = file.toLowerCase();
	file = file.replace(TRIM_IRREGULAR_REGEX, '');
	file = file.replace(SEPARATOR_REGEX, '-');
	return file;
}

module.exports = sluggify;
