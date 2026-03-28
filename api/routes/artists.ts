import express from "express";
import Artist from "../models/Artist";
import {Error} from "mongoose";
import {imagesUpload} from "../middleware/multer";
import { IArtist} from "../types";


const artistRouter = express.Router();

artistRouter.get('/', async (_req, res, next) => {
    try {
        const artists: IArtist[] = await Artist.find()
        res.send(artists);
    } catch (e) {
        next(e)
    }
});

artistRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    const newArtist = new Artist ({
        name: req.body.name,
        image: req.file ? 'images/' + req.file.filename : null,
        information: req.body.information || null,
    });

    try {

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

export default artistRouter;