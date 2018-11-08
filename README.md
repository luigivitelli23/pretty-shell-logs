# Pretty shell logs
 [![NPM](https://img.shields.io/badge/pretty%20shell%20logs-0.1.3-blue.svg?logo=npm&longCache=true&style=flat)](https://www.npmjs.com/package/pretty-shell-logs)

Package to have a really consultable console

## TAGS and PRETTY OBJ

The core implementation for this library is the tagging (paired with a color) to identify a log *competence area* and an easy object rapresentation thanks to `log.pretty()` method

#### Configuration

| Parameter | Description | Default value |
|:------------- |:--------------- |:-------------:|
| titleMinimumWidth | the minimum space for the title section | `14` |
| level | log level *debug*, *info*, *warn*, *errorOrSuccess*, *nothing* | `debug` |
| grep.title | filter for a title | `''` |
| grep.content | filter for a content | `''` |
| exclude.title | hide title occurrences | `''` |
| exclude.content | hide content occurrence | `''` |
| showDate | set the date visibility | `true` |
| titleColorReverse | invert the title and background colors | `true` |
| showLevelLabel | set the log level label visibility | `true` |


### Implementation example

```javascript
const logger = require('./index')

logger.init({
  	titleMinimumWidth: 10,
	level: 'debug',
	showDate: false,
  	titleColorReverse: true,
  	showLevelLabel: false,
	grep: {
		title: 'server',
		content: '',
	},
	exclude: {
		title: '',
		content: '',
	},
})

const obj = {
	foo: 'bar',
}

const tagOneLog = logger.create('Tag nr 1', 'blue')
tagOneLog.d('Debug log')
tagOneLog.i('Info log')
tagOneLog.w('Warning log')
tagOneLog.error('Warning log')

const tagTwoLog = logger.create('Tag nr 2', 'magenta')
tagTwoLog.e('Error log')
tagTwoLog.s('Success log')
tagTwoLog.w('Warning log with a \'pretty\' object',obj, tagTwoLog.pretty(obj, 'Object description'))
```

#### Usage results

<img src="https://github.com/luigivitelli23/pretty-shell-logs/raw/master/img/example.png">

`titleColorReverse` as *true*:

<img src="https://github.com/luigivitelli23/pretty-shell-logs/raw/master/img/example_dark.png">
