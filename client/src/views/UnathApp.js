import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogReg from "./LogReg";

const UnauthApp = (props) =>{
    return(
        <BrowserRouter>
            <section className="App">
                <Routes>
                    <Route element={<LogReg />} path="/" />
                </Routes>
            </section>
        </BrowserRouter>
    )
}

export default UnauthApp