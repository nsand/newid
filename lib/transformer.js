module.exports = transformer;

var fs = require('fs'),
	moment = require('moment'),
	path = require('path');

var timePattern = /^(atime|birthtime|ctime|mtime)(\s*\|\s*(.+))?/;

/**
 * Based on a template string, where variables `{basename}` and `{extname}` can
 * be used as placeholders, return a function that will be invoked with a file name
 * to be transformed.
 * @param {string} template the template string to use for renaming
 */
function transformer(template) {
	'use strict';

	/**
	 * Function that will be invoked during the transformation process. For a
	 * given file, it will return a new string for that file name. The placeholders
	 * {basename} and {extname} can be used to extract the base file name and
	 * extension name from the original file to be used in the transformed name.
	 * @param {string} file the file name to be transformed
	 * @param {number} [index] the index of the file being processed
	 */
	return function (file, index) {
		if (template) {
			// Replace any placeholders
			file = path.join(path.dirname(file), template.replace(/\{([^}]+)}/g, function (match, token) {
				var base = path.basename(file);
				var timeMatch;
				var extIndex = base.lastIndexOf('.');
				if (token === 'basename') {
					return extIndex === -1 ? base : base.substring(0, extIndex);
				}
				else if (token === 'extname') {
					return extIndex === -1 ? '' : base.substring(extIndex + 1);
				}
				else if (token === 'index') {
					return index;
				}
				else if ((timeMatch = timePattern.exec(token))) {
					return moment(fs.statSync(file)[timeMatch[1]]).format(timeMatch[3]);
				}
				return match;
			}));
		}
		return file;
	}
}
