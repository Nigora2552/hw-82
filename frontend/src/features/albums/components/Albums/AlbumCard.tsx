import React from 'react';
import {apiUrl} from "../../../../constants.ts";
import noPhoto from "../../../../assets/noPhoto.jpeg";
import {Box, IconButton} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import DeleteIcon from '@mui/icons-material/Delete';
import {selectUser} from "../../../users/usersSelectore.ts";
import {deleteAlbum} from "../../albumsThunk.ts";


interface Props {
    title: string;
    image: string | null;
    year: number;
    _id: string;
}

const AlbumCard: React.FC<Props> = ({title, image, year, _id}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

    let cardImage = noPhoto;

    if (image) {
        cardImage = apiUrl + '/' + image;
    }


    return (
        <>
            <Box
                 style={{width: '200px', border: "1px solid black", padding: '10px'}}>
                <img style={{width: '100%'}} src={cardImage} alt={title}/>
                <p>{title}</p>
                <span style={{marginRight: '30px'}}>{year}</span>
                {user && user.role === 'admin' &&
                    <IconButton onClick={()=> dispatch(deleteAlbum(_id))} aria-label="delete" size="small">
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                }
            </Box>
        </>
    );
};

export default AlbumCard;