
var OPTIONS = {
	force: 'force'
};

var SHORTHAND = {
	f: 'force'
};

var usage = require('./usage');

module.exports = opts;

function opts(args) {
	return args.reduce(function (options, arg, idx) {
		if (arg.indexOf('-') === 0) {
			// It's a flag
			arg = arg.slice(1);
			if (arg.indexOf('-') === 0) {
				arg = arg.slice(1);
				if (OPTIONS[arg]) {
					options.flags[OPTIONS[arg]] = true;
				}
				else {
					usage();
					process.exit(1);
				}
			}
			else {
				arg.split('').reduce(function (flags, flag) {
					if (SHORTHAND[flag]) {
						options.flags[SHORTHAND[flag]] = true;
					}
					else {
						usage();
						process.exit(1);
					}
					return flags;
				}, options.flags);
			}
		}
		else {
			if (!options.pattern) {
				options.pattern = arg;
			}
			else if (!options.template) {
				options.template = arg;
			}
			else {
				usage();
				process.exit(1);
			}
		}
		return options;
	}, {flags: {}});
}
