import './App.css'
import NavBar from "./components/NavBar/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home.tsx";

function Albums() {
    return null;
}

const App = () => {

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path='/' element={(<Home/>)}/>
                <Route path='/albums' element={(<Albums/>)}/>
            </Routes>
        </>
    )
};

export default App
