import { app, server } from './socket/socket.js'
import express from 'express';
import { connectDB } from './database/connection1.database.js'
import userRoute from './routes/user.route.js'
import messageRoute from './routes/message.route.js'
import { errorMiddleware } from './middlewares/error.middleware.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

connectDB()
const PORT = process.env.PORT
app.get('/', (req, res) =>{
    res.send("Working")
})
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://gupshup-backend.vercel.app",
    credentials: true
}))
app.use('/api/v1/user', userRoute)
app.use('/api/v1/message', messageRoute)
app.use(errorMiddleware)

server.listen(PORT, ()=>{
    console.log(`Server running at PORT ${PORT}`)
})

