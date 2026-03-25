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