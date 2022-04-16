import { useState } from "react";

import { FormControlLabel, Checkbox, Box, TextField, Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";


const LocationForm = (props)=>{
    const navigate = useNavigate();
    const {errors, initialLocation, submitProp} = props
    const [loaded, setLoaded] = useState(false);
    const [location, setLocation] = useState(initialLocation);

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
    const handleSubmit = (e) => {
        e.preventDefault();
            console.log(location);
            submitProp(location);
            navigate('/locations');
    }
    return(

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
        <FormControlLabel control={<Checkbox checked={location.reminders} onChange={handleChecked}/>} label="Inventory Reminders" />
        <Button 
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

export default LocationForm