import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectAlbums, selectLoading} from "../../features/albums/albumSelectors.ts";
import AlbumCard from "../AlbumCard/AlbumCard.tsx";
import {CircularProgress} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {getAllAlbums} from "../../features/albums/albumsThunk.ts";


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
         {loading && <CircularProgress/>}
         {!loading && albums.length === 0 ? <p>No albums</p>
         : <div style={{display: 'flex',flexWrap:'wrap', gap: '10px', marginTop: '20px'}}>
             {albums.map(alb => (
                 <AlbumCard key={alb._id} title={alb.title} year={alb.year} image={alb.image}/>
             ))}
         </div>}
     </>
    );
};

export default Albums;