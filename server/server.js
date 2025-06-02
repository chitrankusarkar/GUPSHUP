import { app, server } from './socket/socket.js';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './database/connection1.database.js';
import userRoute from './routes/user.route.js';
import messageRoute from './routes/message.route.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

connectDB();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "https://gupshup-inky.vercel.app",
  "https://gupshup-inky.vercel.app/login"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


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

app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send("Working");
});

app.use('/api/v1/user', userRoute);
app.use('/api/v1/message', messageRoute);


app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
