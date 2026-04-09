import React from 'react';
import {apiUrl} from "../../../../constants.ts";
import noPhoto from "../../../../assets/noPhoto.jpeg";
import {Box, IconButton} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../../../app/hooks.ts";
import {getAllTracks} from "../../../tracks/tracksThunk.ts";
import {deleteArtist} from "../../../artists/artistsThunks.ts";
import DeleteIcon from '@mui/icons-material/Delete';


interface Props {
    title: string;
    image: string | null;
    year: number;
    _id: string;
}

const AlbumCard: React.FC<Props> = ({title, image, year, _id}) => {
    const dispatch = useAppDispatch();


    let cardImage = noPhoto;

    if (image) {
        cardImage = apiUrl + '/' + image;
    }



    return (
        <>
            <Box onClick={() => dispatch(getAllTracks(_id))} component={NavLink} to={`/tracks?album=${_id}`}
                 style={{width: '200px', border: "1px solid black", padding: '10px'}}>
                <img style={{width: '100%'}} src={cardImage} alt={title}/>
                <p>{title}</p>
                <span style={{ marginRight: '30px'}}>{year}</span>
                <IconButton onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault()
                    dispatch(deleteArtist(_id))
                }} aria-label="delete" size="small">
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </Box>
        </>
    );
};

export default AlbumCard;