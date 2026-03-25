import { Box } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {NavLink} from "react-router-dom";
// import Button from '@mui/material/Button';

const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>

                    <Typography component={NavLink} to='/' sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
                        News
                    </Typography>
                    {/*<Button color="inherit">Login</Button>*/}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;