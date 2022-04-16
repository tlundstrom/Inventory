import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link as RouterLink, useNavigate} from 'react-router-dom'
import { useState } from "react";
import axios from "axios";
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';

const theme = createTheme();

const Register = (props) =>{
    const [errors, setErrors] = useState({});
    const navigate =useNavigate();
    const {login} = useContext(UserContext);
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
                axios.post('http://localhost:8000/api/users/login',
                {
                    email: user.email,
                    password: user.password
                },
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
                    login();
                } )
                .catch(err => {
                    console.error(err);
                    setErrors(err.response.data.errors);
                });
                navigate("/home")

            })
            .catch((err)=> {
                console.log(err);
                setErrors(err.response.data.errors);
            });
    }

    return(
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box  
                    sx={{
                        marginTop: 4,
                        marginBottom: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">Register</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField 
                            error={!!errors.name}
                            helperText={errors.name?errors.name.message:null}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={user.name}
                            onChange={(e)=>{handleChange(e)}}
                        />
                        <TextField 
                            error={!!errors.email}
                            helperText={errors.email?errors.email.message:null}
                            margin="normal"
                            required
                            fullWidth
                            id="reg-email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={user.email}
                            onChange={(e)=>{handleChange(e)}}
                        />
                        <TextField 
                            error={!!errors.password}
                            helperText={errors.password?errors.password.message:null}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="reg-password"
                            value={user.password}
                            onChange={(e)=>{handleChange(e)}}
                        />
                        <TextField 
                            error={!!errors.confirm}
                            helperText={errors.confirm?errors.confirm.message:null}
                            margin="normal"
                            required
                            fullWidth
                            name="confirm"
                            label="Confirm Password"
                            type="password"
                            id="confirm"
                            value={user.confirm}
                            onChange={(e)=>{handleChange(e)}}
                        />
                        <Button 
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        > 
                            Register
                        </Button>
                    </Box>
                </Box>
                <Grid container justifyContent={"flex-end"}>
                    <Grid item>
                    <Link component={RouterLink} to="/" variant="body2" onClick={toggleForm} >{"Already Have an Account?"}</Link>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>

    )
}

export default Register