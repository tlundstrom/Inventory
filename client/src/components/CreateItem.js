import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {MenuItem} from '@mui/material';


const theme = createTheme();


const CreateItem = (props) =>{
    const [loaded, setLoaded] = useState(false);
    const [locations, setLocations] = useState([]);
    const [distributors, setDistributors] = useState([]);
    const [item, setItem] = useState({
        name: "",
        location: "",
        unit: "",
        cost: 0,
        distributor: "",
        par:0,
        amount:0,
        createdBy:""
    })

    useEffect(()=>{
        axios
            .get("http://localhost:8000/api/locations", {withCredentials:true})
            .then(res =>{
                setLocations(res.data);
                axios
                    .get("http://localhost:8000/api/distributors", {withCredentials: true})
                    .then(res =>{
                        setDistributors(res.data);
                        console.log(distributors[0])
                        setLoaded(true);
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
        
    }, [])

    const handleChange = (e) =>{
        setItem({
            ...item,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        axios
            .post("http://localhost:8000/api/items",
                item,
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
                    <Typography component="h1" variant="h5">Enter a new Item</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Item Name"
                            name="name"
                            value={item.name}
                            onChange={(e)=>{handleChange(e)}}
                        />
                            <TextField
                                margin="normal"
                                fullWidth
                                select
                                required
                                id="location"
                                label="Location"
                                name="location"
                                value={item.location}
                                onChange={(e)=>{handleChange(e)}}
                            >
                                {
                                    loaded && locations.map((location,index)=>{
                                        return(
                                            <MenuItem key={index} value={location.name}>{location.name}</MenuItem>
                                        )
                                    })
                                }
                            </TextField>
                            <TextField
                                margin="normal"
                                fullWidth
                                select
                                required
                                id="distributor"
                                labelId='distributor-label'
                                label="Distributor"
                                name="distributor"
                                value={item.distributor}
                                onChange={(e)=>{handleChange(e)}}
                            >
                                {
                                    loaded && distributors.map((distributor,index)=>{
                                        return(
                                            <MenuItem key={index} value={distributor.distName}>{distributor.distName}</MenuItem>
                                        )
                                    })
                                }
                        </TextField>
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="unit"
                            label="Unit of Measurement"
                            name="unit"
                            value={item.name}
                            onChange={(e)=>{handleChange(e)}}
                        />
                        <TextField 
                            margin="normal"
                            fullWidth
                            id="cost"
                            label="Cost"
                            name="cost"
                            value={item.cost}
                            onChange={(e)=>{handleChange(e)}}
                        />
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="par"
                            label="Par"
                            name="par"
                            value={item.par}
                            onChange={(e)=>{handleChange(e)}}
                        />
                        <TextField 
                            margin="normal"
                            fullWidth
                            id="amount"
                            label="Current Amount"
                            name="amount"
                            value={item.amount}
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

export default CreateItem