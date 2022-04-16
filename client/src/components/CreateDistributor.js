import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DistributorForm from './DistributorForm';


const theme = createTheme();


const CreateDistributor = (props) =>{
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [initialDistributor, setInitialDistributor] = useState({
        distName: "",
        repName: "",
        phoneNumber: "",
        repEmail: "",
        orderDays: "",
        createdBy:""
    })
    const createDistributor = (distributor) =>{
        axios
            .post("http://localhost:8000/api/distributors",
                distributor,
                {withCredentials: true}
            )
            .then(res =>{
                console.log(res);
                navigate('/home/items')
            })
            .catch(err => {
                console.error(err);
                setErrors(err.response.data.errors);
            });
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
                    <Typography component="h1" variant="h5">Enter a new Distributor</Typography>
                    <DistributorForm errors={errors} initialDistributor={initialDistributor} submitProp={createDistributor} />
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default CreateDistributor