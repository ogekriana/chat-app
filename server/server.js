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

app.use(express.static(publicPath))

io.on('connection', (socket) => {
	socket.emit("newMessage", generateMessage('Admin', 'Welcome to the chat app'))
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined to the app'))

	socket.on('createMessage', (message) => {
		// io.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// })

		// broadcast message except to the user who send the message
		socket.broadcast.emit('newMessage', generateMessage(message.from, message.text))
	})

	socket.on('disconnect', () => {
		console.log(`user was disconnected`)		
	})
})

server.listen(port, () => {
	console.log(`application running on port ${port}`)
})
