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