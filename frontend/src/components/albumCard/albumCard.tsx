import React from 'react';
import {apiUrl} from "../../constants.ts";
import noPhoto from "../../assets/noPhoto.jpeg";

interface Props {
    title: string;
    image: string | null;
    year: number;
}

const AlbumCard: React.FC<Props> = ({title,image,year}) => {
    let cardImage = noPhoto;

    if(image){
        cardImage = apiUrl + '/' + image;
    }


    return (
        <div style={{width: '300px', border: "1px solid black", padding: '10px'}}>
            <img style={{width: '100%'}} src={cardImage} alt={title} />
            <p>{title}</p>
            <span>{year}</span>

        </div>
    );
};

export default AlbumCard;