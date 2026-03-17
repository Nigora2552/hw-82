import express from "express";
import Track from "../models/Track";
import {Error} from "mongoose";


const trackRouter = express.Router();


trackRouter.get('/:id', async (req, res) => {
    const query: { album?: string } = {};

    if (req.query.album) {
        query.album = req.query.album as string;
    }

    const track = await Track.find(query).populate("album_id");
    return res.send(track);
});

trackRouter.post('/', async (req, res, next) => {
    const newTrack = new Track({
        album_id: req.body.album_id,
        name: req.body.name,
        duration: req.body.duration || null,
    })

    try {
            await newTrack.save();
            return res.send(newTrack);

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error)
    }
})


export default trackRouter;