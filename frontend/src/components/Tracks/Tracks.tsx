import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectLoading, selectTracks} from "../../features/tracks/tracksSelectore.ts";
import {getAllTracks} from "../../features/tracks/tracksThunk.ts";
import {CircularProgress} from "@mui/material";
import TrackCard from "./TrackCard.tsx";

const Tracks = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracks);
    const loading = useAppSelector(selectLoading);

    const album = searchParams.get('album');
    console.log(album)

    useEffect(() => {
        if (album) {
            dispatch(getAllTracks(album))
        }
    }, [dispatch, album]);

    useEffect(() => {
        console.log('track', tracks)
    }, [tracks]);

    return (
        <div style={{ display: 'flex', alignItems: 'center',}}>
            {loading && <CircularProgress/>}
            {!loading && tracks.length === 0 ? <>No track</> :
                <>
                    {
                        tracks.map(track => (
                            <TrackCard key={track._id} track={track}/>
                        ))
                    }
                </>
            }
        </div>
    );
};

export default Tracks;