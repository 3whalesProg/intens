const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'})
PORT = process.env.PORT || 5001
const express = require('express')

const sequelize = require('./db')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const fileUpload = require('express-fileupload')
const path = require('path')
const app = express()
const http = require('http').Server(app)
const socketIO = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000'
    }
})
var cors = require('cors')

app.use(cors({origin: true, credentials: true}))


app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)

socketIO.on('connection', (socket) => {
    console.log(`${socket.id}user coonected`)
    socket.on('join chat', (room) => {
        console.log('пользователь в комнате!' + room)
        socket.join(room)
    })
    socket.on('message', (data) => {
        socketIO.emit('response', data)
    })
    socket.on('disconnect', () => {
        console.log(`${socket.id} user discoonected`)
    })

})

app.use(errorHandler)

const start = async() =>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        http.listen(process.env.PORT, () => console.log('server start'))
    }
    catch(e){
        console.log(e)
    }
}

start()