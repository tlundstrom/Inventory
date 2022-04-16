import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

const DistributorForm = (props) =>{
    const navigate = useNavigate();
    const {errors, initialDistributor, submitProp} = props
    const [distributor, setDistributor] = useState(initialDistributor);

    const handleChange = (e) =>{
        setDistributor({
            ...distributor,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
            console.log(distributor);
            submitProp(distributor);
            navigate('/distributors');
    }

    return(
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField 
                error={!!errors.distName}
                helperText={errors.distName?errors.distName.message:null}
                size="small"
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
                error={!!errors.repName}
                helperText={errors.repName?errors.repName.message:null}
                size="small"
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
                error={!!errors.repEmail}
                helperText={errors.repEmail?errors.repEmail.message:null}
                size="small"
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
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?errors.phoneNumber.message:null}
                size="small"
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

export default DistributorForm