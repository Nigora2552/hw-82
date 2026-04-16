import {NavLink, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {Button, CircularProgress} from "@mui/material";
import TrackCard from "./TrackCard.tsx";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {selectLoading, selectTracks} from "../../tracksSelectore.ts";
import {getAllTracks, getAllTracksByQuery} from "../../tracksThunk.ts";
import {selectUser} from "../../../users/usersSelectore.ts";

const Tracks = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracks);
    const user = useAppSelector(selectUser);

    const loading = useAppSelector(selectLoading);

    const album = searchParams.get('album');

    useEffect(() => {
        dispatch(getAllTracksByQuery(album))
        dispatch(getAllTracks())
    }, [dispatch, album]);

    return (
        <>
            {user && user.role === 'admin' &&
                <Button component={NavLink} to='/add_track/new'>Add Track</Button>
            }
            <h1>Tracks: </h1>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>

                {loading && <CircularProgress/>}
                {!loading && tracks.length === 0 && <>No track</>}
                {!loading && tracks.length > 0 &&
                    (
                        tracks.map(track => (
                            <TrackCard key={track._id} track={track}/>
                        ))
                    )}
            </div>
        </>
    );
};

export default Tracks;