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
import { Grid } from '@mui/material';


const theme = createTheme();
const navigate = useNavigate();
const [location, setLocation] = useState({
    name: "",
    rep: "",
    phoneNumber: "",
    email: "",
    orderDays: "",
    createdBy:""
})

const CreateLocation = (props) =>{
    
    return (

    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">Enter a new Location</Typography>

            </Box>
        </Container>
    </ThemeProvider>

    )
}

export default CreateLocation