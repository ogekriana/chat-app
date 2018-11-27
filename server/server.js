const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const { generateMessage } = require('./utils/message')
const { isRealString } = require('./utils/validation')
const { Users } = require('./models/users')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
const app = express()
var server = http.createServer(app)
var io = socketIO(server)
var users = new Users()


app.use(express.static(publicPath))

io.on('connection', (socket) => {
	// inside here response to the event on the browser
	socket.on('join', (params, callback) => {
		if(!isRealString(params.name) || !isRealString(params.room))
			callback('name and room are required')

		// 	socket.join(params.room)
		// 	users.removeUser(socket.id)
		// 	users.addUser(socket.id, params.name, params.room)

		// 	io.to(params.room).emit('updateUserList', users.getUserList(params.room))
		// 	socket.emit("newMessage", generateMessage('Admin', 'Welcome to the chat app'))
		// 	socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined to the chat`))
		// 	callback()

		// NOTE
		// io.emit ==> io.to('room name').emit // show to all the user on the socket
		// socket.broadcast.emit ==> socket.broadcast.to('room name').emit // show to all the user on the socket except the current user
		// socket.emit // show to the current user only

		socket.join(params.room)
		if(!users.isUserExistInRoom(params.name, params.room)){
			users.removeUser(socket.id)
			users.addUser(socket.id, params.name, params.room)

			socket.emit("newMessage", generateMessage('Admin', 'Welcome to the chat app'))
			socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined to the chat`))
		}
		io.to(params.room).emit('updateUserList', users.getUserList(params.room))
		callback()
	})

	socket.on('createMessage', (message, callback) => {
		// broadcast message except to the user who send the message
		// socket.broadcast.emit('newMessage', generateMessage(message.from, message.text)) // show on the all client exclude the sender
		// socket.emit('newMessage', generateMessage(message.from, message.text)) // show on the sender only
		// io.emit('newMessage', generateMessage(message.from, message.text)) // show on the all client

		let user = users.getUser(socket.id)
		if(user && isRealString(message.text)){
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
		}
		callback(message)
	})

	socket.on('disconnect', () => {
		console.log(`user was disconnected`)
		let user = users.removeUser(socket.id)
		if(user){
			io.to(user.room).emit('updateUserList', users.getUserList(user.room))
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
		}
	})
})

server.listen(port, () => {
	console.log(`application running on port ${port}`)
})
