export interface IArtist{
    id: string;
    name: string;
    image: string | null;
    information: string;
}
export interface AlbumMutation{
    title: string;
    artist: IArtist;
    year: string;
    image: string | null;
}
