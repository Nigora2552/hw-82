import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
    } catch (e) {
        console.log('Collections were not present, skipping drop')
    }

    const admin = new User(
        {
            username: 'admin',
            password: '123',
            role: 'admin',
            token: '',
        });

    admin.generateAuthToken();
    await admin.save();

    const alisa = new User(
        {
            username: 'alisa',
            password: '123',
            role: 'user',
            token: '',
        });

    alisa.generateAuthToken();
    await alisa.save();

    const alex = new User(
        {
            username: 'alex',
            password: '123',
            role: 'user',
            token: '',
        });

    alex.generateAuthToken();
    await alex.save();

    const murat = await Artist.create(
        {
            name: 'Murat Nasyrov',
            image: 'fixtures/muratNasyrov.jpeg',
            information: ' Murat Nasyrov text',
            isPublished: true,
        }
    );


    const anna = await Artist.create({
        name: 'Anna Asti',
        image: 'fixtures/annaAsti.jpeg',
        information: ' Anna Asti text',
        isPublished: true,
    });



    await Album.create(
        {
            artist: anna._id,
            title: 'Царица',
            year: 2023,
            image: 'fixtures/annaAlbum.jpeg',
            isPublished: true,
        },
        {
            artist: anna!._id,
            title: 'Феникс',
            year: 2022,
            image: 'fixtures/annaAlbum.jpeg',
            isPublished: true,
        },
        {
            artist: murat!._id,
            title: 'Кто то простит',
            year: 1997,
            image: 'fixtures/MuratAlbum.jpeg',
            isPublished: true,

        },
        {
            artist: murat!._id,
            title: 'Разбуди меня',
            year: 2002,
            image: 'fixtures/MuratAlbum.jpeg',
            isPublished: true,

        },
        {
            artist: murat!._id,
            title: 'test Murat Album',
            year: 1989,
            image: null,
            isPublished: false,
        },
    );

    await Track.create(
        {
            album: anna!._id,
            title: 'Anna track 1',
            duration: "2:36",
            trackNumber: 1,
            isPublished: true,

        },
        {
            album: anna!._id,
            title: 'Anna track 2',
            duration: "2:00",
            trackNumber: 2,
            isPublished: false,

        },
        {
            album: anna!._id,
            title: 'Anna track 3',
            duration: "3:01",
            trackNumber: 3,
            isPublished: true,

        },
        {
            album: anna!._id,
            title: 'Anna track 4',
            duration: "3:27",
            trackNumber: 4,
            isPublished: true,

        },
        {
            album: anna!._id,
            title: 'Anna track 5',
            duration: "1:50",
            trackNumber: 5,
            isPublished: true,

        },
        {
            album: anna!._id,
            title: 'Anna track 1 no isPublished',
            duration: "2:00",
            trackNumber: 6,
            isPublished: false,

        },
        {
            album: anna!._id,
            title: 'Anna track 2 no isPublished',
            duration: "2:00",
            trackNumber: 7,
            isPublished: false,

        },
        {
            album: murat!._id,
            title: 'Murat track 1',
            duration: "2:00",
            trackNumber: 1,
            isPublished: true,

        }, {
            album: murat!._id,
            title: 'Murat track 2',
            duration: "2:05",
            trackNumber: 2,
            isPublished: true,

        }, {
            album: murat!._id,
            title: 'Murat track 3',
            duration: "2:45",
            trackNumber: 3,
            isPublished: true,

        }, {
            album: murat!._id,
            title: 'Murat track 4',
            duration: "1:53",
            trackNumber: 4,
            isPublished: true,

        }, {
            album: murat!._id,
            title: 'Murat track 5',
            duration: "2:03",
            trackNumber: 5,
            isPublished: true,

        },
        {
            album: murat!._id,
            title: 'Murat track 1 no Published',
            duration: "2:03",
            trackNumber: 6,
            isPublished: false,

        },
    )


    await db.close()
}

run().catch(err => console.error(err))