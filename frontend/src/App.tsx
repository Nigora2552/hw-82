import './App.css'
import NavBar from "./components/NavBar/NavBar.tsx";
import { Routes} from "react-router-dom";

const App = () => {

    return (
        <>
            <NavBar/>
            <Routes>
                {/*<Route path='/' element={(<Home/>)}/>*/}
            </Routes>
        </>
    )
};

export default App
