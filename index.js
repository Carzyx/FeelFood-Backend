'use strict'

const app = require('./routes/app'),
mongoose = require('mongoose'),
server = require('http').Server(app),
io = require('socket.io')(server),
api = require('./routes/app'),
config = require('./config/config');


mongoose.Promise = global.Promise;

// Connection to DB
mongoose.connect(config.uri)
.then(() => console.log(`Established connection with database on ${config.uri}`))
.catch(err => console.log(`Error connecting with the database: ${err}`));

//Starting Node
server.listen(config.port, () => {
    console.log(`Node server running on http://localhost:${config.port}`)  
  });

// server.listen(4444, function() {
//     console.log('Servidor corriendo en http://localhost:4444');
// });
global.sockets=[];
io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');

    socket.on('id', function (id) {
        console.log(id)
        if(sockets.length<1)
            sockets.push({id:id, socket:socket});
        else {
            for (let i=0; i<sockets.length; i++) {
                if(sockets[i].id = id)
                    sockets[i].socket=socket;
                else if(i = (sockets.length-1))
                    sockets.push({id:id, socket:socket})
            }
        }
    });

});