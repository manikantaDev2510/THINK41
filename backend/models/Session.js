import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    sessionTitle: String,
    startedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Session", SessionSchema);
