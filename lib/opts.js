
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
		if (typeof options !== 'undefined') {
			if (arg.indexOf('-') === 0) {
				// It's a flag
				arg = arg.slice(1);
				if (arg.indexOf('-') === 0) {
					arg = arg.slice(1);
					if (OPTIONS[arg]) {
						options.flags[OPTIONS[arg]] = true;
					}
					else {
						return undefined;
					}
				}
				else {
					var flags = arg.split('').reduce(function (flags, flag) {
						if (typeof flags !== 'undefined') {
							if (SHORTHAND[flag]) {
								options.flags[SHORTHAND[flag]] = true;
							}
							else {
								return undefined;
							}
						}
						return flags;
					}, options.flags);
					if (!flags) {
						return undefined;
					}
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
					return undefined;
				}
			}
		}

		return options;
	}, {flags: {}});
}
