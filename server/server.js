import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './database/connection1.database.js';
import userRoute from './routes/user.route.js';
import messageRoute from './routes/message.route.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { app, server } from './socket/socket.js'; // your socket integration

connectDB();
const PORT = process.env.PORT || 5000;

// ✅ Allow frontend access
app.use(cors({
  origin: "https://gupshup-inky.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecretkey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  },
}));

app.get('/', (req, res) => {
  res.send("Server is up and running.");
});

app.use('/api/v1/user', userRoute);
app.use('/api/v1/message', messageRoute);
app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
