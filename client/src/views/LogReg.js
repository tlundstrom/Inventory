import { useState, useEffect } from "react";
import Login from "../components/login";
import Register from "../components/register";

const LogReg = (props) =>{
    const [haveAccount, setHaveAccount] = useState(true);

    const toggleForm = () =>{
        setHaveAccount(!haveAccount);
    }

    return(
        <section>
            {
            haveAccount?
            <Login toggleForm={toggleForm}/>
            :<Register toggleForm={toggleForm}/>
            }
        </section>
    )
    
}

export default LogReg