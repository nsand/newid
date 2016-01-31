var TRIM_IRREGULAR_REGEX = /^\s+|[^a-z0-9 \-]|\s+$/g;
var SEPARATOR_REGEX = /[\s-]+/g;

/**
 * Converts the string into a slug, removing non-ascii characters,
 * and reducing whitespace into hyphens
 * @param {string} string the file name
 */
function sluggify(string) {
	'use strict';
	string = string.toLowerCase();
	string = string.replace(TRIM_IRREGULAR_REGEX, '');
	string = string.replace(SEPARATOR_REGEX, '-');
	return string;
}

module.exports = sluggify;
