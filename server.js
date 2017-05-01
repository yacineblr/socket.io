// server.ts 
"use strict";
exports.__esModule = true;
var http = require("http");
var fs = require("fs");
var socketIO = require("socket.io");
// Chargement du fichier index.html affiché au client
var server = http.createServer(function (req, res) {
    fs.readFile('./index.html', 'utf-8', function (error, content) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
    });
});
// Chargement de socket.io
var io = socketIO().listen(server);
io.on('connection', function (socket) {
    console.log(socket.id + " vient de se connecter (" + socket.handshake.address + ")");
    // socket.emit('message', 'Vous êtes bien connecté !');
    socket.on('message', function (msg) {
        console.log('Client message: ', msg);
        socket.broadcast.emit('message', msg);
    });
    socket.on("disconnect", function () {
        console.log(socket.id + " vient de se d\u00E9connecter (" + socket.handshake.address + ")");
    });
});
server.listen(8080);
