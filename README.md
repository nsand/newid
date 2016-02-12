# newid
Newid is Welsh for 'change', but it is pretty fitting for giving a file a new name, too.

## Installation
To use the API:

```bash
npm install --save newid
```

To use the CLI and make the command `newid` available on your system:
```bash
npm install -g newid
```

## Usage

If there are any changes to be made, you'll get a list of the before and after. You'll have to confirm that you want to make all of the changes, unless you use the `force` flag.

### Supported Options
* `force` - Renames matching files without being prompted
* `insensitive` - Ignore case when finding matching files
* `help` - Display usage help and immediately exit
* `slugify` - Slugifies the file name, converting it to lowercase, replacing all non-English characters, and collapsing whitespace and separators into a single dash. (e.g., `this filè_010.jpg` => `this-file-010.jpg`)

### Supported placeholders
* `{basename}` - The base name of the file
* `{extname}` - The file extension *excluding* the `.`
* `{index}` - The index the file will be processed in

### Supported placeholders - Timestamps
All file timestamps can be formatted using valid [Moment.js Formats](http://momentjs.com/docs/#/displaying/format/). Use the `|` to separate the timestamp type from the format string. As an example, `{atime | YYYY-MM-DD}`
* `{atime}` - The time at which the file was last accessed
* `{ctime}` - The time at which the file was last changed, this can include file permission changes in addition to content changes.
* `{mtime}` - Time time at which the file's contents were last modified
* `{birthtime}` - The time at which the file was created

### API

```javascript
var newid = require('newid');
newid('**/*.js', function (file) {
	// Adds the 'old' extension to all JavaScript files
	return file + '.old';
}, {force: true});
```

```javascript
// Using the included transformer that parses placeholders: {basename}, {extname}, and {index}
var newid = require('newid');
newid('**/*.js', newid.transformer('{index}.{extname}'));
```

### CLI

```bash
# Rename all JS files to end with .old
newid "**/*.js" {basename}.{extname}.old

# Rename all matching files and inject their index into the new name using the {index} placeholder
newid "**/*.js" {basename}-{index}.{extname}

# Rename all matching files to include its modification time, formatted as YYYY-MM-DD
newid "**/*.js" {basename}-{mtime | YYYY-MM-DD}.{extname}

# Rename all matching files without being prompted (--force|-f)
newid "**/*.js" {basename}.{extname}.old --force

# Rename all matching files regardless of case (--insensitive|-i)
newid "**/*.js" {basename}.{extname}.old --insensitive

# Rename all matching files, converting them into slugs (--slugify|-s)
newid "**/*.js" "{basename} {extname}.old" --slugify
```
