import net from 'net'
import stream from 'stream'
import util from 'util'

const message_delimiter = '\f' // or '\n'

// a stream for decoding messages received on a TCP socket

function Message_decoder(parameters)
{
	stream.Transform.call(this, merge(parameters, { readableObjectMode: true }))

	this.incomplete_message = ''
}

util.inherits(Message_decoder, stream.Transform)

Message_decoder.prototype._transform = function(text, encoding, callback)
{
	const messages = (this.incomplete_message + text).split(message_delimiter).filter(text => text.length > 0)
	this.incomplete_message = messages.pop()

	for (let message of messages)
	{
		try
		{
			this.push(JSON.parse(message))
		}
		catch (error)
		{
			log.error(`Malformed JSON message`, message)
		}
	}

	callback()
}

// a stream for encoding JSON object messages being sent to a TCP socket

function Message_encoder(parameters)
{
	stream.Transform.call(this, merge(parameters, { writableObjectMode: true }))
}

util.inherits(Message_encoder, stream.Transform)

Message_encoder.prototype._transform = function(object, encoding, callback)
{
	// append message delimiter to allow for packet fragmentation.
	// prepend message delimiter to guard against packet loss in case of UDP, etc.
	this.push(message_delimiter + JSON.stringify(object) + message_delimiter)
	callback()
}

// connects to the TCP server for sending JSON messages
export function client({ host, port })
{
	const socket = new net.Socket()

	console.log(`Connecting to TCP server at ${host}:${port}`)

	socket.connect({ host, port })

	socket.setDefaultEncoding('utf8')

	let connection_lost
	let reconnecting
	let retries_made

	function reset()
	{
		reconnecting = false
		retries_made = 0
		connection_lost = false
	}

	socket.on('connect', function()
	{
		reset()

		// log variable exists after TCP connection

		log.info('Connected to TCP server')

		// event_stream.trigger('connected')
	})

	socket.on('error', function(error)
	{
		connection_lost = true

		// log variable exists after TCP connection

		log.error('Connection error', error)
	})

	const max_retries = undefined

	const reconnection_delays = [0, 100, 300, 700, 1500]

	socket.on('close', function(had_error)
	{
		connection_lost = true

		// log variable exists after TCP connection

		log.info(had_error ? 'Connection closed due to an error' : 'Connection closed')

		if (max_retries === 0)
		{
			message_encoder.unpipe(socket)
			return log.info(`Will not try to reconnect. Destroying socket.`)
		}

		if (reconnecting)
		{
			log.error(`Reconnect failed`)

			if (exists(max_retries) && retries_made === max_retries)
			{
				message_encoder.unpipe(socket)
				return log.error(`Max retries count reached. Will not try to reconnect further.`)
			}

			log.info(`Trying to reconnect`)
		}

		reconnecting = true

		const reconnect = () =>
		{
			if (!reconnecting)
			{
				return
			}

			retries_made++
			socket.connect()
		}

		const reconnection_delay = retries_made < reconnection_delays.length ? reconnection_delays[retries_made] : reconnection_delays.last()

		reconnect.delay_for(reconnection_delay)
	})

	// encodes JSON messages to textual representation

	const message_encoder = new Message_encoder()
	message_encoder.pipe(socket)

	// create a writable stream

	function Stream(parameters)
	{
		stream.Writable.call(this, merge(parameters, { objectMode: true }))
	}

	util.inherits(Stream, stream.Writable)

	Stream.prototype._write = function(object, encoding, callback)
	{
		if (connection_lost)
		{
			return callback(new Error('Message lost due to connection issues'))
		}

		message_encoder.write(object, undefined, callback)
	}

	// return writable stream
	return new Stream()
}

// creates a TCP server listening for JSON messages
export function server({ host, port })
{
	// create a transform stream

	function Stream(parameters)
	{
		stream.Transform.call(this, merge(parameters, { readableObjectMode: true, writableObjectMode: true }))
	}

	util.inherits(Stream, stream.Transform)

	Stream.prototype._transform = function(object, encoding, callback)
	{
		this.push(object)
		callback()
	}

	const message_stream = new Stream()

	// set up a TCP server

	const server = net.createServer(socket =>
	{
		// decodes textual message representation into a JSON object message
		const message_decoder = new Message_decoder()

		socket.setEncoding('utf8')
		message_decoder.setDefaultEncoding('utf8')

		socket.pipe(message_decoder).pipe(message_stream)

		socket.on('error', function(error)
		{
			log.error(`Socket error`, error)
		})

		socket.on('close', function(data)
		{
			log.info(`Socket closed`)

			socket.unpipe(message_decoder)
			message_decoder.unpipe(message_stream)
		})
	})

	log.info(`Starting TCP server at ${host}:${port}`)

	// start TCP server

	server.listen({ host, port }, error =>
	{
		if (error)
		{
			// log.error(error)
			return message_stream.emit('error', error)
		}

		log.info(`TCP server is listening`)
	})

	// return readable stream
	return message_stream
}

// local machine sockets:
//
// if (process.platform === 'win32')
// {
// 	path = path.replace(/^\//, '').replace(/\//g, '-')
// 	path = `\\\\.\\pipe\\${path}`
// }
//
// const socket = net.connect({ path: path })

// tls:
//
// const tls = {}
//
// tls.key = fs.readFileSync(private)
// tls.cert = fs.readFileSync(public)
//
// tls.ca = [fs.readFileSync(tls.trustedConnections)]
//
// tls.host =
// tls.port =
//
// const socket = tls.connect(tls)