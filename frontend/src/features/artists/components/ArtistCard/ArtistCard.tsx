import React from 'react';
import {Box, IconButton, Paper} from "@mui/material";
import noPhoto from '../../../../assets/noPhoto.jpeg'
import {apiUrl} from "../../../../constants.ts";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {deleteArtist} from "../../artistsThunks.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import {selectUser} from "../../../users/usersSelectore.ts";


interface Props {
    name: string;
    image: string | null;
    _id: string;
}

const ArtistCard: React.FC<Props> = ({name, image, _id}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);


    let cardImage = noPhoto;

    if (image) {
        cardImage = apiUrl + '/' + image;
    }


    return (
        <Paper
            sx={{minHeight: '418px', width: '250px', padding: '10px', margin: '10px', textAlign: 'center'}}>
            <img style={{width: '100%'}} src={cardImage} alt={name}/>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 'auto',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <p>{name}</p>
                {user && user.role === 'admin' &&
                    <IconButton onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault()
                        dispatch(deleteArtist(_id))
                    }} aria-label="delete" size="small">
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                }
            </Box>
        </Paper>
    );
};

export default ArtistCard;