import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { useEffect, useState } from "react"
import { Typography, Dialog, Button, DialogContent, DialogActions,DialogContentText, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";



const Items = (props) =>{
    const [itemsList, setItemsList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [open, setOpen] = useState(false);
    const [itemDelete, setItemDelete] = useState({})
    const navigate = useNavigate();

    useEffect(()=>{
        axios
            .get("http://localhost:8000/api/items", {withCredentials: true})
            .then(res =>{
                setItemsList(res.data);
                console.log(res.data);
                setLoaded(true);
            } )
            .catch(err => console.error(err));
    },[])
    const handleOpen = (item) => {
        setItemDelete(item);
        setOpen(true);
    };
    const handleEdit =(id)=>{
        navigate(`/items/edit/${id}`);
    }

    const handleClose = () =>{
        setOpen(false);
    }
    const handleDelete = async () =>{
        axios
            .delete(`http://localhost:8000/api/items/${itemDelete._id}`, {withCredentials:true})
            .then(res => {
                setItemsList(itemsList.filter(item=> item._id !==itemDelete._id));
                console.log(itemDelete.name + " Succussfully Deleted");
            })
            .catch(err => console.error(err));
        handleClose();
    }

    return(
        <>
            <Typography component="h1" variant="h5">All Items</Typography>
            <List sx={{ width: '100%', maxWidth: 360 }}>
                {
                    loaded && itemsList.map((item, index) =>{
                        return(
                            <ListItem key={index} secondaryAction={
                                <section>
                                    <IconButton onClick={()=>handleOpen(item)}>
                                        <DeleteForeverIcon/>
                                    </IconButton>
                                    <IconButton onClick={()=>handleEdit(item._id)}>
                                        <EditIcon/>
                                    </IconButton>
                                </section>
                            }>
                                <ListItemText primary={item.name} />
                            </ListItem>
                        )
                    })
                }
            </List>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Item Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting an item is permentant and cannot be undone. <br/><br/> Do you wish you to continue deleting {itemDelete.name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )

}

export default Items