import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {getArtists} from "../../features/artists/artistsThunks.ts";
import {selectArtist, selectLoading} from "../../features/artists/artistsSelectors.ts";
import {Button, CircularProgress} from "@mui/material";
import ArtistCard from "../../features/artists/components/ArtistCard/ArtistCard.tsx";
import {NavLink} from "react-router-dom";
import {selectUser} from "../../features/users/usersSelectore.ts";


const Home = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtist)
    const loading = useAppSelector(selectLoading);
    const user = useAppSelector(selectUser)


    useEffect(() => {
        dispatch(getArtists())
    }, []);

    return (
        < >
            {user &&
            <Button component={NavLink} to='/add_artist/new'>Add Artist</Button>
            }
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
        </>

    );
};

export default Home;