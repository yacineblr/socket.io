// server.ts 
  
import http = require('http'); 
import os = require('os'); 
import fs = require('fs');
import socketIO = require('socket.io');


// Chargement du fichier index.html affiché au client
let server = http.createServer((req, res) => {
    fs.readFile('./index.html', 'utf-8', (error, content) => {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
let io = socketIO().listen(server);

io.on('connection', (socket)=> {
  console.log(`${socket.id} vient de se connecter (${socket.handshake.address})`);

  // socket.emit('message', 'Vous êtes bien connecté !');

  socket.on('message', (msg) => {
    console.log('Client message: ', msg);
    socket.broadcast.emit('message', msg);
  })

  socket.on("disconnect", () => {
    console.log(`${socket.id} vient de se déconnecter (${socket.handshake.address})`); 
  });
})


server.listen(8080);