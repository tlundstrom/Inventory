import { useEffect, useState } from "react";
import axios from "axios";
import { createTheme, ThemeProvider, Container, CssBaseline, Box, TextField, Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const ItemForm = (props)=>{
    const navigate = useNavigate();
    const {errors, initialItem, submitProp} = props
    const [loaded, setLoaded] = useState(false);
    const [locations, setLocations] = useState([]);
    const [distributors, setDistributors] = useState([]);
    const [item, setItem] = useState(initialItem)


    const handleChange = (e) =>{
        setItem({
            ...item,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
            console.log(item);
            submitProp(item);
            navigate('/items');
    }

    useEffect(()=>{
        axios
            .get("http://localhost:8000/api/locations", {withCredentials:true})
            .then(res =>{
                setLocations(res.data);
                axios
                    .get("http://localhost:8000/api/distributors", {withCredentials: true})
                    .then(res =>{
                        setDistributors(res.data);
                        setLoaded(true);
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
        
    }, [])
    return(
        
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
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        
                        <TextField 
                            error={!!errors.name}
                            helperText={errors.name?errors.name.message:null}
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Item Name"
                            name="name"
                            value={item.name}
                            onChange={(e)=>{handleChange(e)}}
                        />
                        {
                            loaded && <TextField
                                error={!!errors.location}
                                helperText="Location is required."
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
                                {locations.map((location,index)=>{
                                    return(
                                        <MenuItem key={index} value={location._id}>{location.name}</MenuItem>
                                    )
                                })}
                            </TextField>
                            }{
                                loaded && <TextField
                                    error={!!errors.distributor}
                                    helperText="Distributor is required."
                                    margin="normal"
                                    fullWidth
                                    select
                                    required
                                    id="distributor"
                                    label="Distributor"
                                    name="distributor"
                                    value={item.distributor}
                                    onChange={(e)=>{handleChange(e)}}
                                >
                                    {
                                        distributors.map((distributor,index)=>{
                                            return(
                                                <MenuItem key={index} value={distributor._id}>{distributor.distName}</MenuItem>
                                            )
                                        })
                                    }
                            </TextField>
                            }
                        <TextField 
                            error={errors.unit?true:false}
                            helperText={errors.unit?errors.unit.message:null}
                            margin="normal"
                            required
                            fullWidth
                            id="unit"
                            label="Unit of Measurement"
                            name="unit"
                            value={item.unit}
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
                            error={!!errors.par}
                            margin="normal"
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

export default ItemForm