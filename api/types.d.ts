export interface IArtist{
    id: string;
    name: string;
    image: string | null;
    information: string;
}

export interface UserFields{
    username: string;
    password: string;
    token: string;
    role: string;
    displayName?: string;
    googleID?: string;
    avatar?: string;
}