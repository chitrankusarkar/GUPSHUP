import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { connectDB } from './database/connection1.database.js'

connectDB()
const app = express()
const PORT = process.env.PORT

import userRoute from './routes/user.route.js'
app.use('/api/v1/user', userRoute)

app.listen(PORT, ()=>{
    console.log(`Server running at PORT ${PORT}`)
})

