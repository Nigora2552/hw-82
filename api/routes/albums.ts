import express from "express";
import Album from "../models/Album";
import  {Error} from "mongoose";
import {imagesUpload} from "../multer";
import {AlbumMutation }from "../types";


const albumRouter = express.Router();

albumRouter.get('/', async (req, res, next) => {
    const query: { artist?: string } = {};

    if (req.query.artist) {
        query.artist = req.query.artist as string;
    }

    const albums = await Album.find(query).populate("artist");
    return res.send(albums)

});
albumRouter.get('/:id', async (req, res) => {
    const {id} = req.params;
    if (!id) return res.status(400).send({error: 'Id must be provided in the request params'})

    const albumId = await Album.findById(id);
    if(!albumId) return res.status(404).send({error: 'Album not found'});


    return res.send(albumId)

})

albumRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    const newAlbum: AlbumMutation = {
        name: req.body.name,
        artist: req.body.artist,
        yearOfPublication: req.body.yearOfPublication,
        albumImage: req.file ? 'images/' + req.file.filename : null,
    }

    try {
        const album = new Album(newAlbum);
        await album.save();
        return res.send(album);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error)
        }
        next(error);
    }
});

export default albumRouter;