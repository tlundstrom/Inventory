import { Box, Container } from "@mui/material"
import IconButton from '@mui/material/IconButton';
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
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';


const MobileFooter = (props) =>{
    const [value, setValue] = useState(0);

    const { logout } = useContext(UserContext);
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
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                >
                <BottomNavigationAction onClick={()=>{handleNav('')}} label="Home" icon={<DashboardIcon />} />
                <BottomNavigationAction onClick={()=>{handleNav('distributors')}} label="Distributors" icon={<GroupsIcon />} />
                <BottomNavigationAction onClick={()=>{handleNav('locations')}} label="Locations" icon={<KitchenIcon />} />
                <BottomNavigationAction onClick={()=>{handleNav('items')}} label="Inventory" icon={<InventoryIcon />} />
                <BottomNavigationAction onClick={handleLogout} label="Logout" icon={<LogoutIcon />} />
            </BottomNavigation>
        </Paper>
    )
}

export default MobileFooter