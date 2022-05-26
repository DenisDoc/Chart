const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

app.use(cors())
 
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000/chart',
        methods: ['GET', 'POST']
    },
})

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`) 

    const interval = setInterval(() => {  
    const generateCandle = () => {
        return {
            'ts_code': "000001.SH",
            'trade_date': new Date(),
            'close': Number((Math.random() * (2534.511 - 3032.511 + 1) + 3034.51).toFixed(4)),
            'open': Number((Math.random() * (2506.888 - 3001.888 + 1) + 3006.888).toFixed(4)),
            'high': Number((Math.random() * (2500.0000 - 3505.0000 + 1) + 3000.000).toFixed(4)),
            'low': Number((Math.random() * (3040.7138 - 3991.7138 + 1) + 2940.713).toFixed(4)),
            'vol': Number(Math.random() * (307333369 - 367333369 + 1) + 347333369),
            'amount': Number((Math.random() * (447053681.5 - 447053685.5 + 1) + 447053681.5).toFixed(1))
          }
    }
    socket.emit('newCandle', generateCandle())
    }, 1000)      
})

server.listen(3001, () => {
    console.log('server is running')
})

   