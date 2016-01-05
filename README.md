# newid
Newid is Welsh for 'change', but it is pretty fitting for giving a file a new name, too.

## Installation
To use the API:

```bash
npm install newid
```

To use the CLI and make the command `newid` available on your system:
```bash
npm install -g newid
```

## Usage

### Supported Options
* `force` - Renames matching files without being prompted

### API
```javascript
var newid = require('newid');
newid('**/*.js', function (file) {
	// Adds the 'old' extension to all JavaScript files
	return file + '.old';
}, {force: true});
```

### CLI
```bash
# Rename all JS files to end with .old
newid "**/*.js" {basename}.{extname}.old

# Rename all matching files without being prompted (--force|-f)
newid "**/*.js" {basename}.{extname}.old --force
```
