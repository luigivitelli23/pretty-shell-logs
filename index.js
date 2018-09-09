const get = (object, keys, defaultVal) => {
  keys = Array.isArray( keys )? keys : keys.split('.');
  object = object[keys[0]];
  if (object && keys.length>1) {
    return get(object, keys.slice(1), defaultVal);
  }
  return object === undefined? defaultVal : object;
}

const CODES = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	dim: '\x1b[2m',
	underscore: '\x1b[4m',
	blink: '\x1b[5m',
	reverse: '\x1b[7m',
	hidden: '\x1b[8m',
	blackBg: '\x1b[40m',
}
const COLORS = {
	black: '\x1b[30m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	magenta: '\x1b[35m',
	cyan: '\x1b[36m',
	white: '\x1b[37m',
}
const LEVELS = ['debug', 'info', 'warn', 'errorOrSuccess', 'nothing']

let config

exports.init = opts => {
	config = {
		titleMinimumWidth: get(opts, 'titleMinimumWidth', 14),
		logLevel: LEVELS.indexOf(get(opts, 'level', 'debug')),
		titleGrep: get(opts, 'grep.title', '').toUpperCase(),
		contentGrep: get(opts, 'grep.content', ''),
		titleExclude: get(opts, 'exclude.title', '').toUpperCase(),
		contentExclude: get(opts, 'exclude.content', ''),
		showDate: get(opts, 'showDate', true),
		titleColorReverse: get(opts, 'titleColorReverse', true),
		showLevelLabel: get(opts, 'showLevelLabel', true),
	}
}

const adjustTitle = title => {
	if (title.length >= config.titleMinimumWidth) {
		return title
	}
	const spaces = config.titleMinimumWidth - title.length
	for (var i = 0; i<spaces; i += 2) {
		title = ` ${title}${i===spaces-1?'':' '}`
	}
	return title
}

function Logger (title, titleColor) {
	if (!config) {
		exports.init({})
	}
	const _date = config.showDate?(` [${new Date().toLocaleString()}] `):''
	const _titleRevers = config.titleColorReverse?CODES.reverse:''
	const titleColorCode = get(COLORS, titleColor, '')
	const head = (levelColor = COLORS.white, levelSymbol) => [
		`${CODES.dim}${CODES.blackBg}${_date}${titleColorCode}${CODES.bright}${_titleRevers}`,
		adjustTitle(title.toUpperCase()),
		...(
			config.showLevelLabel
				?[`${levelColor}`,levelSymbol]
				:[]
		),
		CODES.reset,
	]

	function Pretty (args, name = '') {
		this.toString = (color = '') => {
			let content
			try {
				content = JSON.stringify(args, null, 4)
			} catch (e) {
				content = `${COLORS.red}${e}${CODES.reset}${color}`
			}
			return `${CODES.dim}\n${name} [ typeof ${typeof args} ]\n${CODES.reset}${color}${content}${CODES.dim}\n${CODES.reset}${color}`
		}
	}

	this.pretty = (args, name) => new Pretty(args, name)

	const _levelLog = (level, symbol, color) => {
		if (
			config.logLevel > LEVELS.indexOf(level) ||
			title.toUpperCase().search(config.titleGrep) < 0 ||
			(config.titleExclude && title.toUpperCase().search(config.titleExclude) >= 0)
		) {
			return () => {}
		}

		return (...args) => {
			args = args.map(arg =>
				arg && arg.constructor && arg.constructor.name === Pretty.name
				? arg.toString(color || CODES.reset)
				: arg
			)
			const strArgs = args.join()
			if (
				strArgs.search(config.contentGrep) < 0 ||
				(config.contentExclude && strArgs.search(config.contentExclude) >= 0)
			) {
				return
			}
			console.log(
				...head(color, symbol),
				`${CODES.reset}${color?color:''}`,
				...args,
				CODES.reset
			)
		}
	}

	this.d = this.debug = _levelLog('debug', 'd')
	this.i = this.info = _levelLog('info', 'i')
	this.w = this.warn = _levelLog('warn', 'w', COLORS.yellow)
	this.e = this.error = _levelLog('errorOrSuccess', 'e', COLORS.red)
	this.s = this.success = _levelLog('errorOrSuccess', 's', COLORS.green)
}

exports.create = (title, titleColor) => new Logger(title, titleColor)