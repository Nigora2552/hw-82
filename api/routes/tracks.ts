import express from "express";
import Track from "../models/Track";
import mongoose, {Error} from "mongoose";
import Album from "../models/Album";
import auth from "../middleware/auth";
import permit from "../middleware/permit";


const trackRouter = express.Router();

trackRouter.get('/', async(_req,res) => {
    const tracks = await Track.find().sort({ trackNumber: -1 }).populate('album');
    res.send(tracks);
})

trackRouter.get('/', async (req, res, next) => {
    try {
        const query: { album?: string } = {};
        if (req.query.album) query.album = String(req.query.album);
        if (req.query.artist) {
            const artistTrack = await Track.find().populate({
                path: 'album',
                match: {
                    'artist': req.query.artist,
                },
                populate: {
                    path: 'artist',
                }
            });
            let track = artistTrack.filter(track => track.album !== null)
            return res.send(track)
        }

        const tracks = await Track.find(query).populate("album");
        return res.send(tracks);
    } catch (e) {
        next(e)
    }
});

trackRouter.post('/', auth, async (req, res, next) => {

    try {
        const findAlbum = await Album.findById(req.body.album)
        if (!findAlbum) return res.status(404).send('Album not found');

        const tracks = await Track.find();
        const indexTrack = tracks.length + 1;

        const newTrack = new Track({
            album: req.body.album,
            title: req.body.title,
            duration: req.body.duration || null,
            trackNumber: indexTrack,
            isPublished: req.body.isPublished,
        })
        await newTrack.save();
        return res.send(newTrack);

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error)
    }
});

trackRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    const id = req.params.id;
    const isValid = mongoose.Types.ObjectId.isValid(id as string);
    if (!id || !isValid) return res.status(400).send({error: 'Id must be provided in request params'})

    try {
        await Track.findByIdAndDelete(id);
        res.send({message: 'Track deleted successfully!'});
    } catch (e) {
        next(e)
    }
});

trackRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const id = req.params.id;
        const isValid = mongoose.Types.ObjectId.isValid(id as string);
        if (!id || !isValid) return res.status(400).send({error: 'Id must be provided in request params'})

        const track = await Track.findById(id);
        if (!track) return res.status(404).send('Track not found')

        track.isPublished = !track.isPublished;
        await track.save()
        res.send({message: 'Track is published ', track})


    } catch (e) {
        next(e)
    }
});


export default trackRouter;