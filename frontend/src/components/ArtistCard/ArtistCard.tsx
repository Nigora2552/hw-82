import React from 'react';
import { Paper} from "@mui/material";
import noPhoto from '../../assets/noPhoto.jpeg'
import {apiUrl} from "../../constants.ts";
import {NavLink} from "react-router-dom";
import {getAllAlbums} from "../../features/albums/albumsThunk.ts";
import {useAppDispatch} from "../../app/hooks.ts";


interface Props {
    name: string;
    image: string | null;
    _id: string;
}

const ArtistCard:React.FC<Props> = ({name,image, _id}) => {
    const dispatch = useAppDispatch();



    const albQuery = (id: string) => {
        dispatch(getAllAlbums(id))
    }



    let cardImage = noPhoto;

    if(image){
        cardImage = apiUrl + '/' + image;
    }


    return (
        <Paper onClick={() => albQuery(_id)} component={NavLink} to={`/albums?artist=${_id}`} sx={{width: '250px', padding: '10px',margin: '10px', textAlign: 'center'}}>
            <img style={{width: '100%'}} src={cardImage} alt={name} />
            <p>{name}</p>
        </Paper>
    );
};

export default ArtistCard;