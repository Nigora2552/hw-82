import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {getArtists} from "../../features/artists/artistsThunks.ts";
import {selectArtist, selectLoading} from "../../features/artists/artistsSelectors.ts";
import {CircularProgress} from "@mui/material";
import ArtistCard from "../../components/artistCard/artistCard.tsx";


const Home = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtist)
    const loading = useAppSelector(selectLoading)

    useEffect(() => {
        dispatch(getArtists())
    }, []);

    return (
        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
            {loading && <CircularProgress/>}
            {!loading && artists.length > 0 &&
                (
                    artists.map(artist => (
                          <ArtistCard key={artist._id} name={artist.name} image={artist.image} _id={artist._id}/>
                        )
                    ))
            }
        </div>
    );
};

export default Home;