import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = (props) =>{
    const {toggleForm} = props;
    const [user, setUser] =useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
    });

    const handleChange = (e) =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        axios.post('http://localhost:8000/api/users/register', 
        user,
        {
            withCredentials: true
        })
            .then((res)=>{
                setUser({
                    name: "",
                    email: "",
                    password: "",
                    confirm: ""
                })
                console.log(res);
                console.log("registered");
            })
            .catch((err)=> {
                console.log(err);
                console.log(err.response.data)
            });
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" value={user.name} name="name" onChange={(e)=>{handleChange(e)}}/>
                <label>Email:</label>
                <input type="text" value={user.email} name="email" onChange={(e)=>{handleChange(e)}}/>
                <label>Password:</label>
                <input type="text" value={user.password} name="password" onChange={(e)=>{handleChange(e)}}/>
                <label>Confirm Password:</label>
                <input type="text" value={user.confirm} name="confirm" onChange={(e)=>{handleChange(e)}}/>
                <input type="submit" value="Register"/>
            </form>
            <Link onClick={toggleForm} to="#">Already Have an Account?</Link>
        </>
    )
}

export default Register