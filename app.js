var express =require("express");
var app     =express();

app.set("view engine","ejs");

app.use(express.static('public'));

server=app.listen(process.env.PORT,process.env.IP);

app.get("/",function(req,res){
    res.render("index.ejs");
})


//Socket instantiation
var io =require("socket.io")(server);

io.on("connection",function(socket){
    console.log("User is connected");
    socket.username="Anonymous";

        //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
    
     const room =[]//this variable you have store in database and retrieve it when needed.
socket.on('room',data=>{
        if(room.length!=0){
            const temp = data.room.split('!@!@2@!@!').reverse().join('!@!@2@!@!');
            if(room.includes(temp)){
                socket.join(temp)
                console.log('joined room',temp)
                socket.emit('joined',{room:temp})
                console.log(room);
            } else if(room.includes(data.room)){
                socket.join(data.room)
                console.log('joined room', data.room)
                socket.emit('joined', { room: data.room})
                console.log(room);

            }
        }else{
            socket.join(data.room);
            room.push(data.room)
            console.log('joined room',data.room);
            socket.emit('joined', { room: data.room })
            console.log(room);
        }

    })
    
})