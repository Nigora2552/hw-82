import express from "express";
import Album from "../models/Album";
import {Error} from "mongoose";
import {imagesUpload} from "../multer";
import Artist from "../models/Artist";


const albumRouter = express.Router();

albumRouter.get('/', async (req, res, next) => {

    try {
        const query: { artist?: string } = {};

        if (req.query.artist) {
            query.artist = req.query.artist as string;
        }

        const albums = await Album.find(query).sort({year: -1})
        return res.send(albums)
    } catch (e) {
        next(e)
    }
});
albumRouter.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        if (!id) return res.status(400).send({error: 'Id must be provided in the request params'})

        const albumId = await Album.findById(id).populate("artist");
        if (!albumId) return res.status(404).send({error: 'Album not found'});

        return res.send(albumId)

    } catch (e) {
        next(e)
    }


})

albumRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    const fineArtist = await Artist.findById(req.body.artist);
    if (!fineArtist) return res.status(404).send('Artist not found')

    const newAlbum = new Album({
        artist: req.body.artist,
        title: req.body.title,
        year: req.body.year,
        image: req.file ? 'images/' + req.file.filename : null,
    })

    try {
        await newAlbum.save();
        return res.send(newAlbum);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error)
        }
        next(error);
    }
});

export default albumRouter;