import mongoose from "mongoose";


const TrackSchema = new mongoose.Schema({
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        default: null
    },
    trackNumber:{
        type: Number,
        index: true,
        min: 1
    }
});

const Track = mongoose.model("Track", TrackSchema);
export  default Track;