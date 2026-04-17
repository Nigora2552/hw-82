import {useState} from "react";
import type {ArtistMutation} from "../../../../types";
import {
    TextField,
    Button,
    Grid,
} from '@mui/material';
import {useAppDispatch} from "../../../../app/hooks.ts";
import {createArtist} from "../../artistsThunks.ts";
import FileInput from "../../../../components/UI/FileInput/FileInput.tsx";
import {useNavigate} from "react-router-dom";


const ArtistForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState<ArtistMutation>({
        name: '',
        image: null,
        information: '',
        isPublished: false,
    });

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

        if (form.name.trim().length > 0) {
            await dispatch(createArtist({...form, isPublished: true}));
            navigate('/');
        }
        setForm({
            name: '',
            image: null,
            information: '',
            isPublished: false,
        })
    }
    return (
        <form onSubmit={onSubmitForm} style={{width: '70%',margin: '20px auto'}}>
            <Grid spacing={2} >
                <Grid size={12} sx={{marginY:'20px'}}>
                    <TextField
                        required
                        fullWidth
                        id="name"
                        name='name'
                        label="name"
                        variant="outlined"
                        value={form.name}
                        onChange={onInputChange}/>
                </Grid>
                <Grid size={12}  sx={{marginY:'20px'}}>
                    <TextField

                        fullWidth
                        id="information"
                        label="Information"
                        variant="outlined"
                        name='information'
                        value={form.information}
                        onChange={onInputChange}
                    />

                </Grid>
                <Grid size={12}  sx={{marginY:'20px'}}>
                    <FileInput
                        label='image'
                        name='image'
                        onChange={fileInputChangeHandler}
                    />
                </Grid>
            </Grid>
            <Button type='submit'>Add artist</Button>
        </form>
    );
};

export default ArtistForm;