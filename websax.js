// http set
var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var path    = require('path');


// http set
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var HOST = '127.0.0.1';



app.use(express.static(path.join(__dirname,"public"))); // index.html

var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log("server on!: http://localhost:3000/",this.address().port, app.settings.env);
});

// socket connect

io.on('connection', function(socket){


    // Mic+out
    socket.on('micOut', function(data){
        io.emit('micOut',data);
    });
    // Audio file
    socket.on('audioFile', function(data){
        io.emit('audioFile',data);
    });
    //  EQ
    socket.on('eq', function(data){
        io.emit('eq',data);
    });
    //  comp
    socket.on('comp', function(data){
        io.emit('comp',data);
    });
    //  pitch
    socket.on('pitch', function(data){
        io.emit('pitch',data);
    });
    //  time
    socket.on('time', function(data){
        io.emit('time',data);
    });
    //  delay
    socket.on('delay', function(data){
        io.emit('delay',data);
    });
    //  pan
    socket.on('pan', function(data){
        io.emit('pan',data);
    });
    //  record
    socket.on('record', function(data){
        io.emit('record',data);
    });


    // socket.on('control', function(data){
    //     io.emit('control',data);
    //     io.emit('mainOsc1',data);
    //     io.emit('checked',data);
    // });
    // socket.on('selecter', function(data){
    //     io.emit('selecter',data);
    // });
    //
    // socket.on('pitch', function(str){
    //     io.emit('pitch',str);
    // });
    // socket.on('pitchGain', function(str){
    //     io.emit('pitchGain',str);
    // });

}); // io end

server.bind(port, HOST);
