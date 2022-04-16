import * as React from'react'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IcecreamIcon from '@mui/icons-material/Icecream';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import KitchenIcon from '@mui/icons-material/Kitchen';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const DashSidebar = (props) =>{
    const { logout } = useContext(UserContext);
    const { Drawer, open, toggleDrawer} = props;
    const navigate = useNavigate();

    const handleLogout = (e) => {
        axios.post('http://localhost:8000/api/users/logout',{}, {withCredentials: true})
            .then((res)=>{
                logout();
                navigate("/")
            })
            .catch((err)=>{console.log(err)});
    }

    const handleNav = (props) =>{
        navigate(props);
    }
    return(
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
            <ListItemButton onClick={()=>{handleNav('')}}>
                <ListItemIcon>
                    <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Inventory" />
            </ListItemButton>
            <ListItemButton onClick={()=>{handleNav('locations')}}>
                <ListItemIcon>
                    <KitchenIcon/>
                </ListItemIcon>
                <ListItemText primary="Locations" />
            </ListItemButton>
            <ListItemButton onClick={()=>{handleNav('distributors')}}>
                <ListItemIcon>
                    <LocalShippingIcon/>
                </ListItemIcon>
                <ListItemText primary="Distributors" />
            </ListItemButton>
            <ListItemButton onClick={()=>{handleNav('items')}}>
                <ListItemIcon>
                    <IcecreamIcon/>
                </ListItemIcon>
                <ListItemText primary="Items" />
            </ListItemButton>
                <Divider sx={{ my: 1 }} />
                    {/* <ListItemButton onClick={()=>{handleNav}}>
                        <ListItemIcon>
                            <SettingsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItemButton> */}
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
            </List>
        </Drawer>
    )
}

export default DashSidebar