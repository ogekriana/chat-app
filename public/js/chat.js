var socket = io();

socket.on('connect', function() {
	console.log("connected to server")
	var params = jQuery.deparam(window.location.search);

	socket.emit('join', params, function (err) {
		if(err){
			alert(err);
			window.location.href = '/'
		}else{
			console.log("no err")
		}
	})

	// socket.emit("createMessage", {
	// 	from: 'ogekrianamd',
	// 	text: 'hello email from server'
	// })
})

socket.on('disconnect', function() {
	console.log("disconnected from server")
})

socket.on('updateUserList', function(users) {
	console.log("user list", users)
	let ol = jQuery('<ol></ol>')
	users.forEach((user) => {
		ol.append(jQuery('<li></li>').text(user))
	})

	jQuery('#users').html(ol)
})

function scrollToBottom(){
	// selector
	var messages = jQuery("#messages")
	var newMessage = messages.children('li:last-child')

	// height
	var clientHeight = messages.prop('clientHeight')
	var scrollTop = messages.prop('scrollTop')
	var scrollHeight = messages.prop('scrollHeight')
	var newMessageHeight = newMessage.innerHeight()
	var lastMessageHeight = newMessage.prev().innerHeight()

	if((clientHeight + scrollTop + newMessageHeight + lastMessageHeight) >= scrollHeight){
		// console.log("should scroll")
		messages.scrollTop(scrollHeight)
	}
}

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
	scrollToBottom()

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
		text: messageTextbox.val()
	}, function(callbackDataFromServer){
		messageTextbox.val('')
	})
})