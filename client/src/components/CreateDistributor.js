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
import { Grid } from '@mui/material';


const theme = createTheme();


const CreateDistributor = (props) =>{
    const [distributor, setDistributor] = useState({
        distName: "",
        repName: "",
        phoneNumber: "",
        repEmail: "",
        orderDays: "",
        createdBy:""
    })

    const handleChange = (e) =>{
        setDistributor({
            ...distributor,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        axios
            .post("http://localhost:8000/api/distributors",
                distributor,
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
                    <Typography component="h1" variant="h5">Enter a new Distributor</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="distName"
                            label="Distributor Name"
                            name="distName"
                            value={distributor.distName}
                            onChange={(e)=>{handleChange(e)}}
                        />
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="repName"
                            label="Sales Rep Name"
                            name="repName"
                            value={distributor.repName}
                            onChange={(e)=>{handleChange(e)}}
                        />
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="repEmail"
                            label="Sales Rep Email"
                            name="repEmail"
                            value={distributor.repEmail}
                            onChange={(e)=>{handleChange(e)}}
                        />
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="phoneNumber"
                            label="Phone Number"
                            name="phoneNumber"
                            value={distributor.phoneNumber}
                            onChange={(e)=>{handleChange(e)}}
                        />
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

export default CreateDistributor