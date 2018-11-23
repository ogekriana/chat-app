const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')
const app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
	console.log(`new user connected`)

	socket.emit("newEmail", {
		from: 'ogek.riana@gmail.com',
		content: 'hello what is going on?',
		createdAt: 123
	})
	socket.on('disconnect', () => {
		console.log(`user was disconnected`)		
	})
})

server.listen(port, () => {
	console.log(`application running on port ${port}`)
})
