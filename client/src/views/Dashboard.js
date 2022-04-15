import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';


import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

import DashHeader from '../components/DashHeader';
import DashSidebar from '../components/DashSidebar';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
            },
        }),
        },
    }),
);

const theme = createTheme();

const Dashboard = (props) =>{
    const {setLoggedin} = props
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open); 
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display:'flex'}}>
                <CssBaseline/>
                <DashHeader open={open} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth}/>
                <DashSidebar setLoggedin={setLoggedin} Drawer={Drawer} open={open} toggleDrawer={toggleDrawer}/>
            </Box>
        </ThemeProvider>
    )
}

export default Dashboard

