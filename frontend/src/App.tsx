import './App.css'
import NavBar from "./components/UI/NavBar/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home.tsx";
import Albums from "./features/albums/components/Albums/Albums.tsx";
import Tracks from "./components/Tracks/Tracks.tsx";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import {ToastContainer} from "react-toastify";
import {CssBaseline} from "@mui/material";
import ArtistForm from "./features/artists/components/ArtistForm/ArtistForm.tsx";
import ProtectedRouter from "./components/UI/ProtectedRouter/ProtectedRouter.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {selectUser} from "./features/users/usersSelectore.ts";
import AlbumForm from "./features/albums/components/AlbumForm/AlbumForm.tsx";
import TrackForm from "./features/tracks/components/TrackForm/TrackForm.tsx";


const App = () => {
    const user = useAppSelector(selectUser)
    return (
        <>
            <CssBaseline/>
            <ToastContainer/>
            <NavBar/>
            <Routes>
                <Route path='/' element={(<Home/>)}/>
                <Route path='/register' element={(<Register/>)}/>
                <Route path='/login' element={(<Login/>)}/>
                <Route path='/add_artist/new' element={
                    <ProtectedRouter isAllowed={Boolean(user)}>
                        <ArtistForm/>
                    </ProtectedRouter>
                }/>
                <Route path='/add_album/new' element={
                    <ProtectedRouter isAllowed={Boolean(user)}>
                        <AlbumForm/>
                    </ProtectedRouter>
                }/>
                <Route path='/add_track/new' element={
                    <ProtectedRouter isAllowed={Boolean(user)}>
                        <TrackForm/>
                    </ProtectedRouter>
                }/>
                <Route path='/albums' element={(<Albums/>)}/>
                <Route path='/tracks' element={(<Tracks/>)}/>
                <Route path='/*' element={<h1>Page not found</h1>}/>
            </Routes>
        </>
    )
};

export default App
