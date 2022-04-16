import { useState } from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import ItemForm from './ItemForm';
import { createTheme, ThemeProvider, Container, CssBaseline, Box,} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();
const CreateItem = (props) =>{
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [initialItem, setInitialItem] = useState({
        name: "",
        location: "",
        unit: "",
        cost: 0,
        distributor: "",
        par:0,
        amount:0,
        createdBy:""
    })

    const createItem = (item) =>{
        axios
            .post("http://localhost:8000/api/items",
                item,
                {withCredentials: true}
            )
            .then(res =>{
                console.log(res);
                navigate('/home/items');
            })
            .catch(err =>{
                setErrors(err.response.data.errors);
                console.log(err);
                console.log(err.response.data.errors);
            })
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
            <Typography component="h1" variant="h5">Enter a new Item</Typography>
            <ItemForm errors={errors} initialItem={initialItem} submitProp={createItem} />
            </Box>
            </Container>
        </ThemeProvider>
    )
}

export default CreateItem