import { useEffect, useState } from "react";
import axios from "axios";
import { Box, TextField, Button, MenuItem } from "@mui/material";


const ItemForm = (props)=>{
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
        
        
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        
                        <TextField 
                            size="small"
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
                                size="small"
                                error={!!errors.location}
                                helperText={errors.location?"Location is required.":null}
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
                                    size="small"
                                    error={!!errors.distributor}
                                    helperText={errors.location?"Distributor is required.":null}
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
                            size="small"
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
                            size="small"
                            margin="normal"
                            fullWidth
                            id="cost"
                            label="Cost"
                            name="cost"
                            value={item.cost}
                            onChange={(e)=>{handleChange(e)}}
                        />
                        <TextField 
                            size="small"
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
                            size="small"
                            margin="normal"
                            fullWidth
                            id="amount"
                            label="Current Amount"
                            name="amount"
                            value={item.amount}
                            onChange={(e)=>{handleChange(e)}}
                        />
                        <Button 
                            size="small"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        > 
                            Submit
                        </Button>
                    </Box>
                
    )
}

export default ItemForm