import { Server } from 'socket.io'
import Connections from './Objects/Connections'
import Client from './Client/Client'

const io = new Server(3000)

console.log('Server running on port 3000')

io.on('connection', (socket) => {
    var client = new Client(socket)
    Connections.Add(client)

    socket.on('disconnect', () => {
        Connections.Remove(client)
        client.onDisconnect()
    });
})

io.on('disconnect', () => {
    console.log('disconnected')
})