import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Имя обязательное поле"]
    },
    image: {
        type: String,
        default: null
    },
    information: {
        type: String,
        default: null,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
});

const Artist = mongoose.model("Artist", ArtistSchema);
export default Artist;