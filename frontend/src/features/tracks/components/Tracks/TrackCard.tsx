import React from 'react';
import noPhoto from '../../../../assets/noPhoto.jpeg'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {Button, IconButton} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import type {ITracks} from "../../../../types";
import {apiUrl} from "../../../../constants.ts";
import {addTracksHistory} from "../../../trackHistory/trackHistoryThunk.ts";
import {deleteTrack} from "../../tracksThunk.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import {selectUser} from "../../../users/usersSelectore.ts";

interface Props {
    track: ITracks;
}

const TrackCard: React.FC<Props> = ({track}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);


    const image = track.album.image

    let cardImage = noPhoto;

    if(image){
        cardImage = apiUrl + '/' + image;
    }
    return (
        <div style={{
            width: '200px',
            textAlign: 'center',
            margin: '20px',
            border: '1px solid black',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <img alt={track.album.title} src={cardImage ? cardImage : ''}/>
            <p>{track.trackNumber}</p>
            <p>{track.title}</p>
            {user && user.role === 'admin' &&
                <IconButton onClick={() =>
                    dispatch(deleteTrack(track._id))
                } aria-label="delete" size="small">
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            }
            <Button onClick={() => dispatch(addTracksHistory(track))}>
                < PlayArrowIcon/>
            </Button>
        </div>
    );
};

export default TrackCard;