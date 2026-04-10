import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {CircularProgress} from "@mui/material";
import TrackCard from "./TrackCard.tsx";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {selectLoading, selectTracks} from "../../tracksSelectore.ts";
import {getAllTracks} from "../../tracksThunk.ts";

const Tracks = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracks);
    const loading = useAppSelector(selectLoading);

    const album = searchParams.get('album');
    console.log('Весь стейт:', useAppSelector(state => state));

    useEffect(() => {
            dispatch(getAllTracks(album))
        console.log("Состояние tracks изменилось:", tracks);
    }, [dispatch, album,tracks]);

    console.log(tracks)
    return (
        <div style={{ display: 'flex', alignItems: 'center',}}>
            {loading && <CircularProgress/>}
            {!loading && tracks.length === 0 && <>No track</>}
            {!loading && tracks.length > 0 &&
                (
                    tracks.map(track => (
                        <TrackCard key={track._id} track={track}/>
                    ))
                )}
        </div>
    );
};

export default Tracks;