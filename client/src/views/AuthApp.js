import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";


const AuthApp = (props) =>{
    return(
        <BrowserRouter>
            <section className="App">
                <Routes>
                    <Route element={<Dashboard />} path="/home" />
                </Routes>
            </section>
        </BrowserRouter>
    )
}

export default AuthApp