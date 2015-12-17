module.exports = newid;

var _async = require('async'),
	fs = require('fs'),
	glob = require('glob');

/**
 * Looks for files of a given glob pattern and applies the transformation to
 * matching file names
 * @param {string} pattern the glob pattern for the files to match
 * @param {Function} transformer the function to be invoked that will return the transformed file name
 */
function newid(pattern, transformer) {
	'use strict';

	glob(pattern, function (e, files) {
		if (e) {
			process.exit(1);
		}
		else {
			var changes = files.reduce(function (changes, file) {
				// Look for files that would be affected by the file name change
				var change = transformer(file);
				if (change !== file) {
					// Create renaming tasks
					console.log(file + ' \u21E8 ' + change);
					var task = (function (original, modified) {
						return function (callback) {
							fs.rename(original, modified, function (e) {
								callback(e);
							});
						};
					})(file, change);
					changes.push(task);
				}
				return changes;
			}, []);

			if (changes.length > 0) {
				// Run the renaming tasks in parallel
				_async.parallel(changes, function (e) {
					console.log('Done');
					if (e) {
						console.log(e);
					}
				});
			}
		}
	});
}
