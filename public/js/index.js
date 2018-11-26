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
	//*** using ,ustache template
	var formattedTime = moment(newMessage.createdAt).format('h:mm a')
	var template = jQuery("#message-template").html()
	var html = Mustache.render(template, {
		text: newMessage.text,
		from: newMessage.from,
		createdAt: formattedTime
	})
	jQuery('#messages').append(html)

	//*** using basic jquery
	// console.log("newMessage", newMessage)
	// var li = jQuery("<li></li>")
	// var formattedTime = moment(newMessage.createdAt).format('h:mm a')
	// li.text(`${newMessage.from} (${formattedTime}): ${newMessage.text}`)
	// jQuery("#messages").append(li)
})

// socket.emit("createMessage", {
// 	from: 'Ogek',
// 	text: 'Hi'
// }, function(dataFromServer){
// 	console.log(`got it ${dataFromServer}`)
// })

jQuery('#message-form').on('submit', function(e){
	e.preventDefault()
	var messageTextbox = jQuery('[name=message]')
	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
	}, function(callbackDataFromServer){
		messageTextbox.val('')
	})
})