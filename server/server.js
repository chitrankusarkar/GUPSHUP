import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from "body-parser";
import { connectDB } from './database/connection1.database.js'
import userRoute from './routes/user.route.js'
import { errorMiddleware } from './middlewares/error.middleware.js'

connectDB()
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use('/api/v1/user', userRoute)

app.use(errorMiddleware)

app.listen(PORT, ()=>{
    console.log(`Server running at PORT ${PORT}`)
})

