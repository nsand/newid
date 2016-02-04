var TRIM_IRREGULAR_REGEX = /^\s+|[^a-z0-9 \-]|\s+$/g;
var SEPARATOR_REGEX = /[\s-]+/g;
var ASCII_MAP = {};

(function init() {
	// Initializes the international-to-ascii mappings
	var INTL_PAIRS = 'a:àåáâäãåą,e:èéêëę,i:ìíîïı,o:òóôõöøőð,u:ùúûüŭů,c:çćčĉ,z:żźž,s:śşšŝ,n:ñń,y:ýÿ,g:ğĝ,r:ř,l:ł,d:đ,ss:ß,th:\u00fe,h:ĥ,j:ĵ'.split(',');
	INTL_PAIRS.reduce(function (map, pair) {
		var idx = pair.indexOf(':');
		var ascii = pair.substring(0, idx);
		pair.substring(idx + 1).split('').reduce(function (map, character) {
			map[character] = ascii;
			return map;
		}, map);
		return map;
	}, ASCII_MAP);
})();

/**
 * Converts the string into a slug, removing non-ascii characters,
 * and reducing whitespace into hyphens
 * @param {string} string the file name
 */
function sluggify(string) {
	'use strict';
	string = string.toLowerCase();
	var mapped = '';
	// Replace international characters with the ascii equivalent
	for (var i = 0; i < string.length; i++) {
		mapped += ASCII_MAP[string.charAt(i)] || string.charAt(i);
	}
	string = mapped;
	string = string.replace(TRIM_IRREGULAR_REGEX, '');
	string = string.replace(SEPARATOR_REGEX, '-');
	return string;
}

module.exports = sluggify;
