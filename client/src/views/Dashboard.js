import { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import DashHeader from '../components/DashHeader';
import DashSidebar from '../components/DashSidebar';
import { Toolbar } from '@mui/material';
import CreateDistributor from "../components/CreateDistributor";
import CreateItem from "../components/CreateItem";
import CreateLocation from "../components/CreateLocation";
import DistributorDetails from "../components/DistributorDetails";
import Distributors from "../components/Distributors";
import ItemDetails from "../components/ItemDetails";
import Items from "../components/Items";
import LocationDetails from "../components/LocationDetails";
import Locations from "../components/Locations";

import { Route, Routes } from 'react-router-dom';
import TakeInventory from '../components/TakeInventory';


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
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open); 
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display:'flex'}}>
                <CssBaseline/>
                <DashHeader open={open} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth}/>
                <DashSidebar Drawer={Drawer} open={open} toggleDrawer={toggleDrawer}/>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Routes>
                                        <Route element={<CreateDistributor/>} path="/distributors/new" />
                                        <Route element={<Distributors/>} path="/distributors" />
                                        <Route element={<DistributorDetails/>} path="/distributors/edit/:id" />
                                        <Route element={<Items/>} path="/items"/>
                                        <Route element={<Items/>} path="/"/>
                                        <Route element={<ItemDetails/>} path="/items/edit/:id"/>
                                        <Route element={<CreateItem/>} path="/items/new"/>
                                        <Route element={<CreateLocation/>} path="locations/new"/>
                                        <Route element={<LocationDetails />} path="/locations/edit/:id"/>
                                        <Route element={<Locations/>} path="/locations"/>
                                        <Route element={<TakeInventory/>} path="/inventory"/>
                                    </Routes>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default Dashboard

