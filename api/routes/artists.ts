import express from "express";
import Artist from "../models/Artist";
import mongoose, {Error} from "mongoose";
import {imagesUpload} from "../middleware/multer";
import {IArtist} from "../types";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import trackRouter from "./tracks";


const artistRouter = express.Router();

artistRouter.get('/', async (_req, res, next) => {
    try {
        const artists: IArtist[] = await Artist.find()
        res.send(artists);
    } catch (e) {
        next(e)
    }
});

artistRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {

        const newArtist = new Artist({
            name: req.body.name,
            image: req.file ? 'images/' + req.file.filename : null,
            information: req.body.information || null,
            isPublished: req.body.isPublished,
        });

        await newArtist.save();
        return res.send(newArtist);

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error)
    }
});

artistRouter.delete('/:id', auth, permit('admin'),async( req, res, next) => {
    const id = req.params.id;
    const isValid  = mongoose.Types.ObjectId.isValid(id as string);
    if(!id || !isValid) return res.status(400).send({error: 'Id must be provided in request params'})

    try{
        await Artist.findByIdAndDelete(id);
        res.send({message: 'Artist deleted successfully!'})
    } catch (e) {
        next(e)
    }
});

trackRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const id = req.params.id;
        const isValid = mongoose.Types.ObjectId.isValid(id as string);
        if (!id || !isValid) return res.status(400).send({error: 'Id must be provided in request params'})

        const artist = await Artist.findById(id);
        if (!artist) return res.status(404).send('Track not found')

        artist.isPublished = !artist.isPublished;
        await artist.save()
        res.send({message: 'Artist is published ', artist})


    } catch (e) {
        next(e)
    }
});


export default artistRouter;