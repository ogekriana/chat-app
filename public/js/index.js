var socket = io();
socket.on('connect', function() {
	console.log("connected to server")
})
socket.emit("createEmail", {
	to: 'rianamahliadewi@gmail.com',
	text: 'hello email from server'
})
socket.on('disconnect', function() {
	console.log("disconnected from server")
})
socket.on('newEmail', function(email) {
	console.log("new email", email)
})