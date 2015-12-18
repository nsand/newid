module.exports = usage;

var chalk = require('chalk');

function usage() {
	console.log('Usage:\n');
	console.log('\t' + chalk.cyan('newid') + ' <glob pattern> <replacement template> [<options>]\n');
	console.log('Options:\n');
	console.log('\t' + chalk.yellow('-f, --force') + '\t\tRename the matching files without confirmation');
}
