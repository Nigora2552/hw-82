import express from "express"
import  mongoose from "mongoose";
import artistRouter from "./routes/artists";
import albumRouter from "./routes/albums";
import trackRouter from "./routes/tracks";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));

app.use('/artist', artistRouter);
app.use('/albums', albumRouter);
app.use('/tracks', trackRouter);

const run = async () => {
    await mongoose.connect('mongodb://localhost/music_application');

    app.listen(port, () => {
        console.log('Server started on port', port);
    })

    process.on('exit', () => {
        mongoose.disconnect();
    })
}

run().catch(err => console.error(err));