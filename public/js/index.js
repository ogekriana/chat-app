var socket = io();

socket.on('connect', function() {
	console.log("connected to server")

	// socket.emit("createMessage", {
	// 	from: 'ogekrianamd',
	// 	text: 'hello email from server'
	// })
})

socket.on('disconnect', function() {
	console.log("disconnected from server")
})

socket.on('newMessage', function(newMessage) {
	console.log("newMessage", newMessage)
	var li = jQuery("<li></li>")
	li.text(`${newMessage.from}: ${newMessage.text}`)
	jQuery("#messages").append(li)
})

// socket.emit("createMessage", {
// 	from: 'Ogek',
// 	text: 'Hi'
// }, function(dataFromServer){
// 	console.log(`got it ${dataFromServer}`)
// })

jQuery('#message-form').on('submit', function(e){
	e.preventDefault()
	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function(callbackDataFromServer){
		console.log(callbackDataFromServer)
	})
})