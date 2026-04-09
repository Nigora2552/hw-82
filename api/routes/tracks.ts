import express from "express";
import Track from "../models/Track";
import {Error} from "mongoose";
import Album from "../models/Album";
import auth from "../middleware/auth";


const trackRouter = express.Router();


trackRouter.get('/', async (req, res,next) => {
   try{
       const query: { album?: string } = {};
       if (req.query.album) query.album = String(req.query.album);
       if(req.query.artist) {
           const artistTrack = await Track.find().populate({
               path: 'album',
               match:{
                   'artist': req.query.qrtist,
               },
               populate:{
                   path: 'artist',
               }
           });
           let track = artistTrack.filter(track => track.album !== null)
           return res.send(track)
       }

       const tracks = await Track.find(query).populate("album");
       return res.send(tracks);
   } catch(e){
       next(e)
   }
});

trackRouter.post('/',auth, async (req, res, next) => {

    try {
        const findAlbum = await Album.findById(req.body.album)
        if(!findAlbum) return res.status(404).send('Album not found');

        const tracks = await Track.find();
        const indexTrack = tracks.length + 1;

        const newTrack = new Track({
            album: req.body.album,
            title: req.body.title,
            duration: req.body.duration || null,
            trackNumber: indexTrack,
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




export default trackRouter;