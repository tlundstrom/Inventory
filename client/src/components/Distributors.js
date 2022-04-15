import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { useEffect, useState } from "react"

const Distributors = (props) =>{
    const [distList, setDistlist] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        axios
            .get("http://localhost:8000/api/distributors", {withCredentials: true})
            .then(res =>{
                setDistlist(res.data);
                setLoaded(true);
            } )
            .catch(err => console.error(err));
    },[])

    return(
        <List sx={{ width: '100%', maxWidth: 360 }}>
            {
                loaded && distList.map((dist, index) =>{
                    return(
                        <ListItem key={index} secondaryAction={
                            <section>
                                <IconButton>
                                    <DeleteForeverIcon/>
                                </IconButton>
                                <IconButton>
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
    )

}

export default Distributors