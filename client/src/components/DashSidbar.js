import * as React from'react'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';

import GroupsIcon from '@mui/icons-material/Groups';
import KitchenIcon from '@mui/icons-material/Kitchen';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashSidebar = (props) =>{
    const {setLoggedin, Drawer, open, toggleDrawer} = props;
    const navigate = useNavigate();

    const handleLogout = (e) => {
        axios.post('http://localhost:8000/api/users/logout',{}, {withCredentials: true})
            .then((res)=>{
                setLoggedin(false);
                navigate("/")
            })
            .catch((err)=>{console.log(err)});
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
            <ListItemButton onClick={(e)=>{navigate("/home")}}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={(e)=>{navigate("/home")}}>
                <ListItemIcon>
                    <KitchenIcon/>
                </ListItemIcon>
                <ListItemText primary="Locations" />
            </ListItemButton>
            <ListItemButton onClick={(e)=>{navigate("/")}}>
                <ListItemIcon>
                    <GroupsIcon/>
                </ListItemIcon>
                <ListItemText primary="Distributors" />
            </ListItemButton>
            <ListItemButton onClick={(e)=>{navigate("/")}}>
                <ListItemIcon>
                    <InventoryIcon/>
                </ListItemIcon>
                <ListItemText primary="Inventory" />
            </ListItemButton>
                <Divider sx={{ my: 1 }} />
                    <ListItemButton onClick={(e)=>{navigate("/")}}>
                        <ListItemIcon>
                            <SettingsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
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