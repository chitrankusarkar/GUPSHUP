import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import { connectDB } from './database/connection1.database.js'
import userRoute from './routes/user.route.js'
import messageRoute from './routes/message.route.js'
import { errorMiddleware } from './middlewares/error.middleware.js'
import cookieParser from 'cookie-parser';

connectDB()
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/user', userRoute)
app.use('/api/v1/message', messageRoute)
app.use(errorMiddleware)

app.listen(PORT, ()=>{
    console.log(`Server running at PORT ${PORT}`)
})

