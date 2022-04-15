import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const theme = createTheme();

const LogoutBtn = (props) =>{

    const handleSignOut = (e) =>{
        axios.post('http://localhost:8000/api/users/logout',{}, {withCredentials: true})
            .then((res)=>{
                console.log("signed out");
                console.log(res);
            })
            .catch((err)=>{console.log(err)});
    }

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <CssBaseline/>
                <Button
                    variant='contained'
                    sx={{
                        backgroundColor: 'error.dark',
                        '&:hover': {
                            backgroundColor :'error.main',
                            opacity: [0.9, 0.8, 0.7],
                        }
                    }}
                    onClick={handleSignOut}
                >
                    Sign Out
                </Button>
            </Container>
        </ThemeProvider>
    )
}

export default LogoutBtn