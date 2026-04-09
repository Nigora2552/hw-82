import {Button, Menu, MenuItem} from "@mui/material";
import type {User} from "../../types";
import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {logout} from "../../features/users/usersThunks.ts";

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch()

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null)
    };



    return (
        <>
            <Button
                onClick={handleClick}
                color='inherit'
            >
                Hello, {user.username}
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;