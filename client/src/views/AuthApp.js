import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateDistributor from "../components/CreateDistributor";
import Distributors from "../components/Distributors";
import Dashboard from "./Dashboard";


const AuthApp = (props) =>{
    return(
        <BrowserRouter>
            <section className="App">
                <Routes>
                    <Route element={<Dashboard />} path="/home" />
                    <Route element={<CreateDistributor/>} path="/dist" />
                    <Route element={<Distributors/>} path="/showdist" />
                    <Route element={<Dashboard />} path="*" />
                </Routes>
            </section>
        </BrowserRouter>
    )
}

export default AuthApp