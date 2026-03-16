import express from "express";
import Artist from "../models/Artist";
import {Error} from "mongoose";
import {imagesUpload} from "../multer";
import {ArtistMutation} from "../types";


const artistRouter = express.Router();

artistRouter.get('/', async (_req, res, next) => {
    try {
        const artist = await Artist.find()
        res.send(artist);
    } catch (e) {
        next(e)
    }
});

artistRouter.post('/',imagesUpload.single('image'), async (req, res, next) => {
    try{
        const newArtist = {
            name: req.body.name,
            image: req.file ? 'images/' + req.file.filename : null,
            information: req.body.information
        }

       const artist = new Artist(newArtist);
       await artist.save();
       res.send(artist);

   } catch (error) {
       if (error instanceof Error.ValidationError) {
           res.status(400).send(error);
           return;
       }
       next(error)

   }
});

export default artistRouter