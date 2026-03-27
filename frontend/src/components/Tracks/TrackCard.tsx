import React from 'react';
import {apiUrl} from "../../constants.ts";
import noPhoto from '../../assets/noPhoto.jpeg'
import type {ITracks} from "../../types";

interface Props{
    track :ITracks
}

const TrackCard:React.FC<Props> = ({track}) => {

    const image = track.album.image

    let cardImage = noPhoto;

    if(image){
        cardImage = apiUrl + '/' + image;
    }
    return (
        <div style={{width: '200px',margin: '20px',border: '1px solid black', display: 'flex', flexDirection: 'column'}}>
            <img alt={track.album.title} src={cardImage}/>
            <p>{track.trackNumber}</p>
        </div>
    );
};

export default TrackCard;