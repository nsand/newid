# newid
Newid is Welsh for 'change', but it is pretty fitting for giving a file a new name, too.

## Usage

### API
```javascript
var newid = require('newid');
newid('**/*.js', function (file) {
	// Adds the 'old' extension to all JavaScript files
	return file + '.old';
});
```
### CLI
```bash
newid "**/*.js" {basename}.{extname}.old
```
