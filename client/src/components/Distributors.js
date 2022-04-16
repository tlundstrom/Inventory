import {Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, IconButton, List, ListItem, ListItemText } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


const Distributors = (props) =>{
    const navigate = useNavigate();
    const [distList, setDistList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [distributorDelete, setDistributorDelete] = useState({});
    const [open, setOpen] = useState(false);

    const handleOpen = (distributor) => {
        setDistributorDelete(distributor);
        setOpen(true);
    };

    const handleClose = () =>{
        setOpen(false);
    }
    const handleDelete = async () =>{
        axios
            .delete(`http://localhost:8000/api/distributors/${distributorDelete._id}`, {withCredentials:true})
            .then(res => {
                setDistList(distList.filter(distributor=> distributor._id !==distributorDelete._id));
                console.log(distributorDelete.name + " Succussfully Deleted");
            })
            .catch(err => console.error(err));
        handleClose();
    }

    const handleEdit =(id)=>{
        navigate(`/dists/edit/${id}`);
    }

    useEffect(()=>{
        axios
            .get("http://localhost:8000/api/distributors", {withCredentials: true})
            .then(res =>{
                setDistList(res.data);
                setLoaded(true);
            } )
            .catch(err => console.error(err));
    },[])

    return(
        <>
            <Typography component="h1" variant="h5">All Locations</Typography>
            <List sx={{ width: '100%', maxWidth: 360 }}>
                {
                    loaded && distList.map((dist, index) =>{
                        return(
                            <ListItem key={index} secondaryAction={
                                <section>
                                    <IconButton onClick={()=>handleOpen(dist)}>
                                        <DeleteForeverIcon/>
                                    </IconButton>
                                    <IconButton onClick={()=>handleEdit(dist._id)}>
                                        <EditIcon/>
                                    </IconButton>
                                </section>
                            }>
                                <ListItemText primary={dist.distName} />
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
                <DialogTitle id="alert-dialog-title">{"Confirm distributor Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting a distributor is permentant and cannot be undone. <br/><br/> Do you wish you to continue deleting {distributorDelete.name}?
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

export default Distributors