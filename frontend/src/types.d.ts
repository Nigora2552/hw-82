export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string
}

export interface GlobalError {
    error: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}


export interface IArtist {
    _id: string;
    name: string;
    image: string | null;
    information: string;
}

export interface ArtistMutation {
    name: string;
    image: File | null;
    information: string;
}

export interface IAlbums {
    artist: IArtist;
    _id: string;
    title: string;
    year: number;
    image: string | null;
}

export interface ITracks {
    album: IAlbums;
    _id: string;
    title: string;
    duration: string;
    trackNumber: number;
}

export interface ITrackHistory {
    token: string
    track: ITracks,
}