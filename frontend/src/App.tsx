import './App.css'
import NavBar from "./components/NavBar/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home.tsx";
import Albums from "./components/Albums/Albums.tsx";


const App = () => {

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path='/' element={(<Home/>)}/>
                <Route path='/albums' element={(<Albums/>)}/>
                {/*<Route path='/traks' element={(<Traks/>)}/>*/}
            </Routes>
        </>
    )
};

export default App
