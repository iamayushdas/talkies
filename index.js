var express = require('express');
var socket = require('socket.io');

// app setup
var app = express();

var server = app.listen(3000 , function(){
    console.log('listening to port 3000');
})

//static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });
    socket.on('typing',function(data){
        socket.broadcast.emit('typing', data)
    });
    socket.on('typed',function(data){
        socket.broadcast.emit('typed', data)
    })
});
