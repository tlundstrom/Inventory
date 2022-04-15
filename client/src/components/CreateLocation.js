import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from 'react';
import axios from 'axios';
import { MenuItem, Checkbox, FormControlLabel } from '@mui/material';


const theme = createTheme();


const CreateLocation = (props) =>{
    const [location, setLocation] = useState({
        name: "",
        temp: "",
        schedule: "",
        reminders: true,
    })

    const handleChange = (e) =>{
        setLocation({
            ...location,
            [e.target.name]: e.target.value
        });
    };
    const handleChecked = (e) =>{
        setLocation({
            ...location,
            reminders: !location.reminders
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

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
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">Enter a new Location</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Location Name"
                            name="name"
                            value={location.name}
                            onChange={(e)=>{handleChange(e)}}
                        />
                        <TextField 
                            select
                            margin="normal"
                            required
                            fullWidth
                            id="temp"
                            label="Location Type"
                            name="temp"
                            value={location.temp}
                            onChange={(e)=>{handleChange(e)}}
                        >
                            <MenuItem value={'Dry Storage'}>Dry Storage</MenuItem>
                            <MenuItem value={'Refrigerated'}>Refrigerated</MenuItem>
                            <MenuItem value={'Frozen'}>Frozen</MenuItem>
                        </TextField>
                        <TextField 
                            select
                            margin="normal"
                            required
                            fullWidth
                            id="schedule"
                            label="Inventory Frequency"
                            name="schedule"
                            value={location.schedule}
                            onChange={(e)=>{handleChange(e)}}
                        >
                            <MenuItem value={'DNI'}>Do Not Inventory</MenuItem>
                            <MenuItem value={'Monthly'}>Monthly</MenuItem>
                            <MenuItem value={'Quarterly'}>Quarterly</MenuItem>
                            <MenuItem value={'Bi-Yearly'}>Bi-Yearly</MenuItem>
                            <MenuItem value={'Yearly'}>Yearly</MenuItem>
                        </TextField>
                        <FormControlLabel control={<Checkbox defaultChecked onChange={handleChecked}/>} label="Inventory Reminders" />
                        <Button 
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            > 
                                Submit
                            </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default CreateLocation