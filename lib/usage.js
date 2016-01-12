module.exports = usage;

var chalk = require('chalk');

/**
 * Outputs proper usage of the newid CLI
 */
function usage() {
	'use strict';
	console.log('Usage:\n');
	console.log('\t' + chalk.cyan('newid') + ' <glob pattern> <replacement template> [<options>]\n');
	console.log('Options:\n');
	console.log('\t' + chalk.yellow('-f, --force') + '\t\tRename the matching files without confirmation');
	console.log('\t' + chalk.yellow('-h, --help') + '\t\tDisplay this usage message and immediately exit');
	console.log('\t' + chalk.yellow('-i, --insensitive') + '\tIgnore case when finding matching files');
}
