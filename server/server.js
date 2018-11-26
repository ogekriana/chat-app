const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
const app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
	socket.emit("newMessage", {
		from: 'Admin',
		text: 'Welcome to the chat app'
	})

	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New user joined to the app',
		createdAt: new Date().getTime()
	})

	socket.on('createMessage', (message) => {
		// io.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// })

		// broadcast message except to the user who send the message
		socket.broadcast.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		})
	})

	socket.on('disconnect', () => {
		console.log(`user was disconnected`)		
	})
})

server.listen(port, () => {
	console.log(`application running on port ${port}`)
})
