const logger = require('./index')

const obj = {
  titleMinimumWidth: 40,
	level: 'debug',
	showDate: true,
  titleColorReverse: false,
  showLevelLabel: true,
	grep: {
		title: '1',
		content: '',
	},
	exclude: {
		title: '',
		content: '',
	},
}
logger.init({
  titleMinimumWidth: 40,
	level: 'debug',
	showDate: true,
  titleColorReverse: false,
  showLevelLabel: true,
	grep: {
		title: '',
		content: '',
	},
	exclude: {
		title: '',
		content: '',
	},
})

const tagOneLog = logger.create('Tag nr 1', 'blue')
tagOneLog.d('Debug log')
tagOneLog.i('Info log')
tagOneLog.w('Warning log')

const tagTwoLog = logger.create('Tag nr 2', 'magenta')
tagTwoLog.e('Error log')
tagTwoLog.s('Success log')
tagTwoLog.w('Warning log with a \'pretty\' object', tagTwoLog.pretty(obj, 'Object description'))