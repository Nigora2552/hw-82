import mongoose from "mongoose";

const TrackHistorySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    track_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track',
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);
export default TrackHistory;