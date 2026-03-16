import mongoose, {Schema, Types} from "mongoose";
import Artist from "./Artist";

const AlbumSchema = new mongoose.Schema({
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
        validate: {
            validator: async (artistId: Types.ObjectId) => {
                const artist = await  Artist.findById(artistId);
                if(!artist) return false;

                return true;
            },
            message: 'Artist does not exist',
        }
    },
    yearOfPublication: {
        type: String,
        required: true
    },
    albumImage: {
        type: String,
        default: null
    }
});

const Album = mongoose.model("Album", AlbumSchema);
export default Album;