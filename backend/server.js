import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import ChatRoutes from './routes/ChatRoutes.js';
import { ENV_VARS } from './config/envVars.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/chat', ChatRoutes)

app.get('/', (req, res) => res.send("AI Chat Backend Running"));

const PORT = ENV_VARS.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
