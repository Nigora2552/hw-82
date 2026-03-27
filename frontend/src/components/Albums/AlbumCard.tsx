import React from 'react';
import {apiUrl} from "../../constants.ts";
import noPhoto from "../../assets/noPhoto.jpeg";
import {Box} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks.ts";
import {getAllTracks} from "../../features/tracks/tracksThunk.ts";

interface Props {
    title: string;
    image: string | null;
    year: number;
    _id: string;
}

const AlbumCard: React.FC<Props> = ({title,image,year,_id}) => {
const dispatch = useAppDispatch();


    let cardImage = noPhoto;

    if(image){
        cardImage = apiUrl + '/' + image;
    }


    return (
    <>
        <Box onClick={() =>  dispatch(getAllTracks(_id))}  component={NavLink} to={`/tracks?album=${_id}`}  style={{width: '200px', border: "1px solid black", padding: '10px'}}>
            <img style={{width: '100%'}} src={cardImage} alt={title} />
            <p>{title}</p>
            <span>{year}</span>

        </Box>
    </>
    );
};

export default AlbumCard;