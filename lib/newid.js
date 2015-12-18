module.exports = newid;

var _async = require('async'),
	chalk = require('chalk'),
	fs = require('fs'),
	glob = require('glob'),
	inquirer = require('inquirer');

/**
 * Looks for files of a given glob pattern and applies the transformation to
 * matching file names
 * @param {string} pattern the glob pattern for the files to match
 * @param {Function} transformer the function to be invoked that will return the transformed file name
 * @param {object} [options] options to be used while renaming the files
 */
function newid(pattern, transformer, options) {
	'use strict';
	options = options || {};

	glob(pattern, function (e, files) {
		if (e) {
			process.exit(1);
		}
		else {
			var changes = files.reduce(function (changes, file) {
				// Look for files that would be affected by the file name change
				var change = transformer(file);
				if (change !== file) {
					if (changes.length === 0) {
						console.log('The following files will be renamed:\n');
					}
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
				console.log();
				if (options.force) {
					rename();
				}
				else {
					inquirer.prompt({
						type: 'confirm',
						name: 'continue',
						default: true,
						message: 'Do you want to rename these files: '
					}, function (answers) {
						if (answers.continue) {
							rename();
						}
					});
				}
			}

			function rename() {
				// Run the renaming tasks in parallel
				_async.parallel(changes, function (e) {
					console.log(chalk.green('Done'));
					if (e) {
						console.log(e);
					}
				});
			}
		}
	});
}
