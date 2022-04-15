import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link as RouterLink, useNavigate} from 'react-router-dom'
import {useState} from 'react';
import axios from 'axios';

const theme = createTheme();


const Login = (props) => {
    const navigate = useNavigate();
    const {toggleForm, setLoggedin} = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) =>{
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
                setLoggedin(true);
                navigate("/home")
            } )
            .catch(err => console.error(err));

    }

    
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" >
                <CssBaseline/>
                <Box  
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">Sign in</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            id="password"
                            label="Password"
                            name="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Link component={RouterLink} onClick={toggleForm} to="#">Need an Account?</Link>
        </ThemeProvider>
    )
}

export default Login