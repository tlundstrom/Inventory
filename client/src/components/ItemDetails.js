import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import ItemForm from './ItemForm';
import { Navigate, useParams } from 'react-router-dom';

const ItemDetails = (props) =>{
    const [initialItem, setInitialItem] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState({});
    const {id} = useParams();

    useEffect(()=>{
        let isMounted = true;
        axios
            .get(`http://localhost:8000/api/items/${id}`, {withCredentials:true})
            .then(res => {
                if(isMounted){
                    setInitialItem(res.data);
                    setLoaded(true);
                }
            })
            .catch(err =>{
                console.log(err);
                setErrors(err.response.data);
                setLoaded(false);
            });
            return()=>isMounted = false;
    })

    const updateItem = (initialItem) =>{
        axios
            .put(`http://localhost:8000/api/items/${id}`, initialItem, {withCredentials:true})
            .then(res => {
            })
            .catch(err => {
                console.log(err)
                setErrors(err.response.data.errors)
            });
    }



    return(
        <>
            <Typography component="h1" variant="h5">Enter a new Item</Typography>
            {
                loaded && !errors.message?
                <ItemForm errors={errors} initialItem={initialItem} submitProp={updateItem} />
                :<p>{errors.message}</p>
            }
        </>
    )
}

export default ItemDetails