import logger from 'pretty-shell-logs'

logger.init({
  titleMinimumWidth: 10,
	level: 'debug',
	showDate: true,
  titleColorReverse: true,
  showLevelLabel: true,
	grep: {
		title: '',
		content: ''
	},
	exclude: {
		title: '',
		content: '',
	}
})

const serverLog = logger.create('server', 'blue')

const prettyObj = serverLog.pretty({ foo: 'bar'}, 'Object description')

serverLog.d('Debug log', prettyObj)
serverLog.i('Info log', prettyObj)
serverLog.w('Warning log', prettyObj)
serverLog.e('Error log', prettyObj)
serverLog.s('Success log', prettyObj)