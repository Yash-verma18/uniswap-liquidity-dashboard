import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { generalRouter } from './routes/general.routes';
import connectDB from './service/db';
import { Server } from 'socket.io';
const corsOptions = {
  origin: 'http://localhost:8000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());

app.use('/v1', generalRouter);
const httpServer = http.createServer(app);

connectDB();

export const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:8000',
    methods: ['GET', 'POST'],
  },
});

// Socket.IO Events
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Handle subscription to alerts
  socket.on('subscribe:alert', ({ poolId }) => {
    console.log(`Client subscribed to alerts for pool: ${poolId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
