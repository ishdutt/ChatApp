$(function(){
    //FOr connection of socket with our app
    var socket=io.connect("https://webdevelop-ishdutt.c9users.io/");
    
    //buttons and inputs
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")

	//Emit message
// 	if($('#message').val()!=""){
// 	    send_message.click(function(){
// 		socket.emit('new_message', {message : message.val()})
// 	    })
// 	}


    	 send_message.click(function(){
		socket.emit('new_message', {message : message.val()})
    	 })

	//Listen on new_message
	socket.on("new_message", (data) => {
		var count=1;
		feedback.html('');
		message.val('');
		console.log();
		console.log(data.message);
		chatroom.append("<p class='message'>" +img_decide(count)+"  " + data.username + ": " + data.message + "</p>")
		count=count+1;
		console.log(count)
	})
	function img_decide(count){
		if(count%2==0){
			return '<img src="http://bodyrevive.ca/images/client/4.png">'
		}
		else{
			return '<img src="http://mechler.in/wp-content/uploads/2018/06/male-user-png-image-20772-512x470.png">'
		}
	}
	
	
	
	//Emit a username
	send_username.val(function(){
		socket.emit('change_username', {username : username.val()})
	})

	//Emit typing
	message.bind("keypress", () => {
		socket.emit('typing')
	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	})
})