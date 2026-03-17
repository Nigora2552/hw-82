import mongoose, {Types} from "mongoose";
import Album from "./Album";

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    album_id: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
        validate: {
            validator: async (albumId: Types.ObjectId) => {
                const album = await  Album.findById(albumId);
                if(!album) return false;
                return true;
            },
            message: 'Album does not exist',
        }
    },
    name: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        default: null
    }
});

const Track = mongoose.model("Track", TrackSchema);
export  default Track;