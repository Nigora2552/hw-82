import express from "express";
import Album from "../models/Album";
import mongoose, {Error} from "mongoose";
import {imagesUpload} from "../middleware/multer";
import Artist from "../models/Artist";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import trackRouter from "./tracks";


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

albumRouter.post('/',auth,  imagesUpload.single('image'), async (req, res, next) => {

    const fineArtist = await Artist.findById(req.body.artist);
    if (!fineArtist) return res.status(404).send('Artist not found')

    const newAlbum = new Album({
        artist: req.body.artist,
        title: req.body.title,
        year: req.body.year,
        image: req.file ? 'images/' + req.file.filename : null,
        isPublished: req.body.isPublished,
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

albumRouter.delete('/:id', auth,permit('admin'), async( req, res, next) => {
    const id = req.params.id;
    const isValid = mongoose.Types.ObjectId.isValid(id as string);
    if(!id || !isValid) return res.status(400).send({error: 'Id must be provided in request params'})

    try{
        await Album.findByIdAndDelete(id);
        res.send({message: 'Artist deleted successfully!'})
    } catch (e) {
        next(e)
    }
});


albumRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const id = req.params.id;
        const isValid = mongoose.Types.ObjectId.isValid(id as string);
        if (!id || !isValid) return res.status(400).send({error: 'Id must be provided in request params'})

        const album = await Album.findById(id);
        if (!album) return res.status(404).send('Album not found')

        album.isPublished = !album.isPublished;
        await album.save()
        res.send({message: 'Album is published ', album})


    } catch (e) {
        next(e)
    }
});

export default albumRouter;