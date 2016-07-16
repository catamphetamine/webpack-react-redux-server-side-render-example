import path          from 'path'
import fs            from 'fs-extra'
import bunyan        from 'bunyan'
import stream        from 'stream'
import util          from 'util'
import moment        from 'moment'
import { terminal }  from 'print-error'
import levels        from './log levels'

function print_error(error)
{
	console.log(terminal(error))
}

const colours =
{
	Trace : 'blue',
	Debug : 'cyan',
	Info  : 'green',
	Warn  : 'yellow',
	Error : 'red',
	Fatal : 'magenta',
	'...' : 'grey'
}

const styles = 
{
	//styles
	'bold'      : [1,  22],
	'italic'    : [3,  23],
	'underline' : [4,  24],
	'inverse'   : [7,  27],

	//grayscale
	'white'     : [37, 39],
	'grey'      : [90, 39],
	'black'     : [90, 39],

	//colors
	'blue'      : [34, 39],
	'cyan'      : [36, 39],
	'green'     : [32, 39],
	'magenta'   : [35, 39],
	'red'       : [31, 39],
	'yellow'    : [33, 39]
}

function colorize_start(style)
{
	return style ? '\x1B[' + styles[style][0] + 'm' : ''
}

function colorize_end(style)
{
	return style ? '\x1B[' + styles[style][1] + 'm' : ''
}

function colorize(text, style)
{
	return colorize_start(style) + text + colorize_end(style)
}

function preamble(source, level, time, colour)
{
	let preamble = `[${source}] ${time} `
	if (level !== 'Generic')
	{
		preamble += `${level} `
	}
	return colorize(preamble, colour)
}

function print(source, level, message, time)
{
	time = moment(time).format("dddd, MMMM Do YYYY, hh:mm:ss")

	return console.log(preamble
	(
		source,
		level,
		time,
		colours[level.toString()] || colours['...']
	)
	+ message)
}

export default function create(name, options = {})
{
	const console_output = new stream()
	console_output.writable = true

	// for console_output.write()
	const _print = print

	console_output.write = data =>
	{
		if (data.err)
		{
			return print_error(data.err)
		}

		const print = (level, message, time) => _print(data.name, level, message, time)

		print(levels[data.level] || '...', data.msg, data.time)
	}

	const development_log = 
	{
		streams: 
		[{
			type: 'raw',
			stream: console_output
		}],
		serializers: 
		{
			error    : bunyan.stdSerializers.err,
			request  : bunyan.stdSerializers.req,
			response : bunyan.stdSerializers.res,
		}
	}

	const log_path = path.resolve(Root_folder, 'log', `${name}.txt`)

	fs.ensureDirSync(path.dirname(log_path))

	const production_log =
	{
		streams:
		[{
			type: 'raw',
			stream: console_output
		},
		{
			type   : 'rotating-file',
			path   : log_path,
			period : '1d',            // daily rotation
			count  : 3                // keep 3 back copies
		}],
		serializers: 
		{
			error    : bunyan.stdSerializers.err,
			request  : bunyan.stdSerializers.req,
			response : bunyan.stdSerializers.res,
		}
	}

	const log_configuration = (_production_ || process.env.NODE_ENV === 'production') ? production_log : development_log

	return bunyan.createLogger(extend({ name: name }, log_configuration))
}