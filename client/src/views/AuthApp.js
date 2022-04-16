import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateDistributor from "../components/CreateDistributor";
import CreateItem from "../components/CreateItem";
import CreateLocation from "../components/CreateLocation";
import Distributors from "../components/Distributors";
import ItemDetails from "../components/ItemDetails";
import Items from "../components/Items";
import LocationDetails from "../components/LocationDetails";
import Locations from "../components/Locations";
import Dashboard from "./Dashboard";


const AuthApp = (props) =>{
    return(
        <BrowserRouter>
            <section className="App">
                <Routes>
                    <Route element={<Dashboard />} path="/home" />
                    <Route element={<CreateDistributor/>} path="/newdist" />
                    <Route element={<Distributors/>} path="/dists" />
                    <Route element={<Items/>} path="/items"/>
                    <Route element={<ItemDetails/>} path="/items/edit/:id"/>
                    <Route element={<CreateItem/>} path="newitem"/>
                    <Route element={<CreateLocation/>} path="newlocation"/>
                    <Route element={<LocationDetails />} path="/locations/edit/:id"/>
                    <Route element={<Locations/>} path="/locations"/>
                    <Route element={<Dashboard />} path="*" />
                </Routes>
            </section>
        </BrowserRouter>
    )
}

export default AuthApp