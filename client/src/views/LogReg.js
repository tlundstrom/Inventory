import { useState, useEffect } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const LogReg = (props) =>{
    const {setLoggedin} = props;
    const [haveAccount, setHaveAccount] = useState(true);

    const toggleForm = () =>{
        setHaveAccount(!haveAccount);
    }

    return(
        <section>
            {
            haveAccount?
            <Login setLoggedin={setLoggedin} toggleForm={toggleForm}/>
            :<Register setLoggedin={setLoggedin}  toggleForm={toggleForm}/>
            }
        </section>
    )
    
}

export default LogReg