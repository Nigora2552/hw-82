import { useAppSelector} from "../../app/hooks.ts";
import {selectAlbums, selectLoading} from "../../features/albums/albumSelectors.ts";
import AlbumCard from "../albumCard/albumCard.tsx";
import {CircularProgress} from "@mui/material";


const Albums = () => {
    const albums = useAppSelector(selectAlbums);
    const loading = useAppSelector(selectLoading)


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