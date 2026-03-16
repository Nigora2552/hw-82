export interface IArtist{
    id: string;
    name: string;
    image: string | null;
    information: string;
}

export interface ArtistMutation{
    name: string;
    image: string | null;
    information: string;
}



export interface AlbumMutation{
    name: string;
    artist: IArtist;
    yearOfPublication: string;
    albumImage: string | null;
}