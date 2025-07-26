import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
    sender: { type: String, enum: ['user', 'ai'], required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Message", MessageSchema);
