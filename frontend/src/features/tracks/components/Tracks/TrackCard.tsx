import React from 'react';
import noPhoto from '../../assets/noPhoto.jpeg'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {Button} from "@mui/material";
import {useAppDispatch} from "../../../../app/hooks.ts";
import type {ITracks} from "../../../../types";
import {apiUrl} from "../../../../constants.ts";
import {addTracksHistory} from "../../../trackHistory/trackHistoryThunk.ts";

interface Props{
    track :ITracks
}

const TrackCard:React.FC<Props> = ({track}) => {
const dispatch = useAppDispatch();

    const image = track.album.image

    let cardImage = noPhoto;

    if(image){
        cardImage = apiUrl + '/' + image;
    }
    return (
        <div style={{width: '200px',textAlign: 'center',margin: '20px',border: '1px solid black', display: 'flex', flexDirection: 'column'}}>
            <img alt={track.album.title} src={cardImage}/>
            <p>{track.trackNumber}</p>
            <Button onClick={() => dispatch(addTracksHistory(track))}>
                < PlayArrowIcon/>
            </Button>
        </div>
    );
};

export default TrackCard;