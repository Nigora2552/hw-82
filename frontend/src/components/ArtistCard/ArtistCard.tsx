import React from 'react';
import {Button, Paper} from "@mui/material";
import noPhoto from '../../assets/noPhoto.jpeg'
import {apiUrl} from "../../constants.ts";
import {NavLink} from "react-router-dom";
import {getAllAlbums} from "../../features/albums/albumsThunk.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import {deleteArtist} from "../../features/artists/artistsThunks.ts";


interface Props {
    name: string;
    image: string | null;
    _id: string;
}

const ArtistCard:React.FC<Props> = ({name,image, _id}) => {
    const dispatch = useAppDispatch();

    let cardImage = noPhoto;

    if(image){
        cardImage = apiUrl + '/' + image;
    }


    return (
        <Paper onClick={ () =>  dispatch(getAllAlbums(_id))} component={NavLink} to={`/albums?artist=${_id}`} sx={{width: '250px', padding: '10px',margin: '10px', textAlign: 'center'}}>
            <img style={{width: '100%'}} src={cardImage} alt={name} />
            <p>{name}</p>
            <Button onClick={(e)=> {
                e.stopPropagation();
                e.preventDefault()
                dispatch(deleteArtist(_id))
            }}>Delete</Button>
        </Paper>
    );
};

export default ArtistCard;