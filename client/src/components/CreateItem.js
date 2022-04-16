import { useState } from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import ItemForm from './ItemForm';



const CreateItem = (props) =>{
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
            })
            .catch(err =>{
                setErrors(err.response.data.errors);
                console.log(err);
                console.log(err.response.data.errors);
            })
    }


    return (
        <>
            <Typography component="h1" variant="h5">Enter a new Item</Typography>
            <ItemForm errors={errors} initialItem={initialItem} submitProp={createItem} />
        </>
    )
}

export default CreateItem