import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
    } catch (e) {
        console.log('Collections were not present, skipping drop')
    }

    const [muratAlbum, annaAlbum] = await Artist.create(
        {
            name: 'Murat Nasyrov',
            image: 'fixtures/muratNasyrov.jpeg',
            information: ' Murat Nasyrov text',
        },
        {
            name: 'Anna Asti',
            image: 'fixtures/annaAsti.jpeg',
            information: ' Anna Asti text',
        }
    );

    const [annaArtist, muratArtist] = await Album.create(
        {
            artist: annaAlbum!._id,
            title: 'Царица',
            year: 2023,
            image: 'fixtures/annaAlbum.jpeg'
        },
        {
            artist: muratAlbum!._id,
            title: 'Кто то простит',
            year: 2023,
            image: 'fixtures/MuratAlbum.jpeg'
        }
    );

    await Track.create(
        {
            album: annaArtist!._id,
            title: 'Anna track 1',
            duration: "2:36",
        } ,
        {
            album: annaArtist!._id,
            title: 'Anna track 2',
            duration: "2:00",
        } ,
        {
            album: annaArtist!._id,
            title: 'Anna track 2',
            duration: "3:01",
        } ,
        {
            album: annaArtist!._id,
            title: 'Anna track 4',
            duration: "3:27",
        } ,
        {
            album: annaArtist!._id,
            title: 'Anna track 5',
            duration: "1:50",
        },
        {
            album: muratArtist!._id,
            title: 'Murat track 1',
            duration: "2:00",
        }, {
            album: muratArtist!._id,
            title: 'Murat track 2',
            duration: "2:05",
        }, {
            album: muratArtist!._id,
            title: 'Murat track 3',
            duration: "2:45",
        }, {
            album: muratArtist!._id,
            title: 'Murat track 4',
            duration: "1:53",
        }, {
            album: muratArtist!._id,
            title: 'Murat track 5',
            duration: "2:03",
        },
    )


    await db.close()
}

run().catch(err => console.error(err))