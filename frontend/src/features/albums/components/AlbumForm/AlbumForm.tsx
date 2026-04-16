import {useEffect, useState} from "react";
import type {AlbumMutation} from "../../../../types";
import {
    TextField,
    Button,
    Grid,
    Select, MenuItem,
} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import FileInput from "../../../../components/UI/FileInput/FileInput.tsx";
import {createAlbum} from "../../albumsThunk.ts";
import {selectArtist} from "../../../artists/artistsSelectors.ts";
import {getArtists} from "../../../artists/artistsThunks.ts";
import {useNavigate} from "react-router-dom";

const initialSate: AlbumMutation = {
    artist: '',
    title: '',
    image: null,
    year: '',
    isPublished: false,
}

const AlbumForm = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtist);
    const navigate = useNavigate()
    const [form, setForm] = useState<AlbumMutation>(initialSate);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setForm({...form, [name]: value});
    };
    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if (files) {
            setForm(prevState => ({
                ...prevState,
                [name]: files[0]
            }))
        }
    };

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.title.trim().length > 0) {
            await dispatch(createAlbum(
                {
                    ...form,
                    isPublished: true
                }));
            navigate('/')
        }
        setForm(initialSate)
    }
    useEffect(() => {
        dispatch(getArtists());
    }, [dispatch]);
    return (
        <form onSubmit={onSubmitForm} style={{width: '70%', margin: '20px auto'}}>
            <Grid spacing={2}>
                <Grid>
                    <Select
                        required
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name='artist'
                        value={form.artist}
                        label="artist"
                        onChange={(e) => setForm(prev => ({ ...prev, artist: e.target.value as string }))}
                    >
                        {artists && artists.map(artist => (
                        <MenuItem key={artist._id} value={artist._id}>{artist.name}</MenuItem>
                            ))}
                    </Select>
                </Grid>
                <Grid size={12} sx={{marginY: '20px'}}>
                    <TextField
                        required
                        fullWidth
                        id="title"
                        name='title'
                        label="title"
                        variant="outlined"
                        value={form.title}
                        onChange={onInputChange}/>
                </Grid>
                <Grid size={12} sx={{marginY: '20px'}}>
                    <TextField
                        required
                        type='number'
                        fullWidth
                        id="year"
                        label="year"
                        variant="outlined"
                        name='year'
                        value={form.year}
                        onChange={onInputChange}
                    />

                </Grid>
                <Grid size={12} sx={{marginY: '20px'}}>
                    <FileInput
                        label='image'
                        name='image'
                        onChange={fileInputChangeHandler}
                    />
                </Grid>
            </Grid>
            <Button type='submit'>Add album</Button>
        </form>
    );
};

export default AlbumForm;