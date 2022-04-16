
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from 'react';
import axios from 'axios';

import LocationForm from './LocationForm';


const theme = createTheme();


const CreateLocation = (props) =>{
    const [initialLocation, setInitialLocation] = useState({
        name: "",
        temp: "",
        schedule: "",
        reminders: true,
    })
    const [errors, setErrors] = useState({});


    const createLocation = (location) =>{
        axios
            .post("http://localhost:8000/api/locations",
                location,
                {withCredentials: true}
            )
            .then(res =>{
                console.log(res);
            })
            .catch(err => console.error(err));
    }


    return (

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 4,
                        marginBottom: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">Enter a new Location</Typography>
                    <LocationForm errors={errors} initialLocation={initialLocation} submitProp={createLocation} />
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default CreateLocation