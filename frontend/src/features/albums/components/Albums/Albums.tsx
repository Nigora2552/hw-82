import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {selectAlbums, selectLoading} from "../../albumSelectors.ts";
import AlbumCard from "./AlbumCard.tsx";
import {Button, CircularProgress} from "@mui/material";
import {NavLink, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {getAlbumsByQuery, getAllAlbums} from "../../albumsThunk.ts";
import {selectUser} from "../../../users/usersSelectore.ts";


const Albums = () => {
    const albums = useAppSelector(selectAlbums);
    const loading = useAppSelector(selectLoading)
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

    const [searchParams] = useSearchParams();

    const artist = searchParams.get('artist');

    useEffect(() => {
        dispatch(getAllAlbums())
        if (artist) {
            dispatch(getAlbumsByQuery(artist))
        }
    }, [dispatch, artist]);

    return (
        <>
            {user && user.role === 'admin' &&
                <Button component={NavLink} to='/add_album/new'>Add Album</Button>
            }
            {loading && <CircularProgress/>}
            {!loading && albums.length === 0 ? <p>No albums</p>
                : <>
                    <h1>Albums:</h1>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', margin: '40px'}}>
                        {albums.map(alb => (
                            <AlbumCard key={alb._id} title={alb.title} year={alb.year} image={alb.image} _id={alb._id}/>
                        ))}
                    </div>
                </>}
        </>
    );
};

export default Albums;