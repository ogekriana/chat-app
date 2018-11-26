const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
const app = express()
var server = http.createServer(app)
var io = socketIO(server)

const { generateMessage } = require('./utils/message')
const { isRealString } = require('./utils/validation')

app.use(express.static(publicPath))

io.on('connection', (socket) => {
	// inside here response to the event on the browser

	socket.emit("newMessage", generateMessage('Admin', 'Welcome to the chat app'))
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined to the app'))

	socket.on('join', (params, callback) => {
		if(!isRealString(params.name) || !isRealString(params.room))
			callback('name and room are required')
		callback()
	})

	socket.on('createMessage', (message, callback) => {
		// broadcast message except to the user who send the message
		// socket.broadcast.emit('newMessage', generateMessage(message.from, message.text)) // show on the all client exclude the sender
		// socket.emit('newMessage', generateMessage(message.from, message.text)) // show on the sender only
		io.emit('newMessage', generateMessage(message.from, message.text)) // show on the all client
		console.log(message)
		callback(message)
	})

	socket.on('disconnect', () => {
		console.log(`user was disconnected`)		
	})
})

server.listen(port, () => {
	console.log(`application running on port ${port}`)
})
