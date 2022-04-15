import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { useEffect, useState } from "react"

const Items = (props) =>{
    const [itemsList, setItemsList] = useState([]);
    const [loaded, setLoaded] = useState(false);

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

    return(
        <List sx={{ width: '100%', maxWidth: 360 }}>
            {
                loaded && itemsList.map((item, index) =>{
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
                            <ListItemText primary={item.name} />
                        </ListItem>
                    )
                })
            }
        </List>
    )

}

export default Items