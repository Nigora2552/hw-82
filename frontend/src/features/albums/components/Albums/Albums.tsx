import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {selectAlbums, selectLoading} from "../../albumSelectors.ts";
import AlbumCard from "./AlbumCard.tsx";
import {Button, CircularProgress} from "@mui/material";
import {NavLink, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {getAllAlbums} from "../../albumsThunk.ts";


const Albums = () => {
    const albums = useAppSelector(selectAlbums);
    const loading = useAppSelector(selectLoading)
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const artist = searchParams.get('artist');

    useEffect(() => {
        if(artist){
            dispatch(getAllAlbums(artist))
        }
    }, [dispatch,artist]);

    return (
     <>
         <Button component={NavLink} to='/add_album/new'>Add Album</Button>
         {loading && <CircularProgress/>}
         {!loading && albums.length === 0 ? <p>No albums</p>
         : <div style={{display: 'flex',flexWrap:'wrap', gap: '10px', marginTop: '20px'}}>
             {albums.map(alb => (
                 <AlbumCard key={alb._id} title={alb.title} year={alb.year} image={alb.image} _id={alb._id}/>
             ))}
         </div>}
     </>
    );
};

export default Albums;