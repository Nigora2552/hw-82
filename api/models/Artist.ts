import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
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
});

const Artist = mongoose.model("Artist", ArtistSchema);
export default Artist;