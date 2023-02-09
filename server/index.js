const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const cors = require('cors');

app.use(express.static('client'))

app.use(cors());

app.get('/hola-mundo',(req,res) => {
    res.status(200).send("Hola mundo desde una ruta")
})

const messages = [{
    id:1,
    text:'Bienvenido al chat privado de Socket.io y NodeJS',
    nickName: 'Bot . hectorbazalar'
}]

io.on('connection', (socket) => {
   console.log("El cliente con IP:" + socket.handshake.address + " se ha conectado ...") 

   socket.emit('messages', messages)

    socket.on('add-message', (data)=> {
        messages.push(data)

        io.sockets.emit('messages',messages)
    })

})

server.listen(6677,() => {
    console.log('Servidor está funcionando en http://localhost:6677')
})

