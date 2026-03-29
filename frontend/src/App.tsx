import './App.css'
import NavBar from "./components/NavBar/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home.tsx";
import Albums from "./components/Albums/Albums.tsx";
import Tracks from "./components/Tracks/Tracks.tsx";
import Register from "./features/users/Register.tsx";


const App = () => {

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path='/' element={(<Home/>)}/>
                <Route path='/albums' element={(<Albums/>)}/>
                <Route path='/tracks' element={(<Tracks/>)}/>
                <Route path='/register' element={(<Register/>)}/>
                <Route path='/*' element={<h1>Page not found</h1>}/>
            </Routes>
        </>
    )
};

export default App
