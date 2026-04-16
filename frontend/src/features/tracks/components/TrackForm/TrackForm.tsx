import {useEffect, useState} from "react";
import type {TrackMutation} from "../../../../types";
import {
    TextField,
    Button,
    Grid,
    Select, MenuItem,
} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {getArtists} from "../../../artists/artistsThunks.ts";
import {useNavigate} from "react-router-dom";
import {selectAlbums} from "../../../albums/albumSelectors.ts";
import {createTrack} from "../../tracksThunk.ts";

const initialSate: TrackMutation = {
    album: '',
    title: '',
    duration: '',
    trackNumber: '',
    isPublished: false,
}

const TrackForm = () => {
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);
    const navigate = useNavigate()
    const [form, setForm] = useState<TrackMutation>(initialSate);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setForm({...form, [name]: value});
    };


    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.title.trim().length > 0) {
            await dispatch(createTrack(
                {...form}));
            navigate('/albums')
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
                        name='album'
                        value={form.album}
                        label="album"
                        onChange={(e) => setForm(prev => ({ ...prev, artist: e.target.value as string }))}
                    >
                        {albums && albums.map(album => (
                        <MenuItem key={album._id} value={album._id}>{album.title}</MenuItem>
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
                        id="trackNumber"
                        label="trackNumber"
                        variant="outlined"
                        name='trackNumber'
                        value={form.trackNumber}
                        onChange={onInputChange}
                    />

                </Grid>
                <Grid size={12} sx={{marginY: '20px'}}>
                    <TextField
                        required
                        fullWidth
                        id="duration"
                        name='duration'
                        label="duration"
                        variant="outlined"
                        value={form.duration}
                        onChange={onInputChange}/>
                </Grid>
            </Grid>
            <Button type='submit'>Add track</Button>
        </form>
    );
};

export default TrackForm;