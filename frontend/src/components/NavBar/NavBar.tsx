import {Box, Grid} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {NavLink} from "react-router-dom";
import Button from '@mui/material/Button';

const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{mb:2}}>
                <Toolbar>
                    <Grid container justifyContent='space-between' alignItems='center' sx={{width: '100%'}}>
                        <Typography component={NavLink} to='/' sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
                            News
                        </Typography>
                        <Button component={NavLink} to='/register' color="inherit">Sing Up</Button>
                    </Grid>

                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;