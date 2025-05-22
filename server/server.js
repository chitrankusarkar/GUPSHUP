import { app, server } from './socket/socket.js'
import express from 'express'
import { connectDB } from './database/connection1.database.js'
import userRoute from './routes/user.route.js'
import messageRoute from './routes/message.route.js'
import { errorMiddleware } from './middlewares/error.middleware.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

connectDB()
const PORT = process.env.PORT

const allowedOrigins = [
  "https://gupshup-inky.vercel.app"
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send("Working")
})
app.use('/api/v1/user', userRoute)
app.use('/api/v1/message', messageRoute)

app.use(errorMiddleware)

server.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`)
})
