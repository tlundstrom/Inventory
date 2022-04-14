import {useState} from 'react';
import axios from 'axios';

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (e) =>{
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/login", 
            {
                email: email,
                password: password
            },
            {
                withCredentials: true
            })
            .then((res)=>{
                console.log(res, "res");
                console.log(res.data, "is res data");
            } )
            .catch(err => console.error(err));

    }
    
    return (
        <>
            <form onSubmit={submitHandler}>
                <label>Email:</label>
                <input value={email} type="text" onChange={(e) => setEmail(e.target.value)} />
                <label>Password:</label>
                <input value={password} type="password" onChange={(e)=> setPassword(e.target.value)}/>
                <input type="submit" value="Login" />
            </form>
        </>
    )
}

export default Login