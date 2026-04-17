import dotenv from "dotenv";
dotenv.config();

import express from "express"
import  mongoose from "mongoose";
import artistRouter from "./routes/artists";
import albumRouter from "./routes/albums";
import trackRouter from "./routes/tracks";
import usersRouter from "./routes/users";
import trackHistoryRouter from "./routes/trackHistory";
import cors from "cors";
import config from "./config";
import cookieParser from 'cookie-parser';

const app = express();
const port = 8000;


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser())
app.use(express.static('public'));
app.use(express.json());


app.use('/users', usersRouter);
app.use('/artists', artistRouter);
app.use('/albums', albumRouter);
app.use('/tracks', trackRouter);
app.use('/track_history',trackHistoryRouter);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log('Server started on port', port);
    })

    process.on('exit', () => {
        mongoose.disconnect();
    })
}

run().catch(err => console.error(err));