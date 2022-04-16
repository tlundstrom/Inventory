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
import ItemsView from './ItemsView';
import { Toolbar } from '@mui/material';
import DistributorView from './DistributorView';
import LocationView from './LocationView';


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
    const [selected, setSelected] = useState('items');
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open); 
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display:'flex'}}>
                <CssBaseline/>
                <DashHeader open={open} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth}/>
                <DashSidebar setSelected={setSelected} Drawer={Drawer} open={open} toggleDrawer={toggleDrawer}/>
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
                                        height: 240,
                                    }}
                                >
                                    {
                                        selected==='items'?
                                        <ItemsView/>
                                        :null
                                    }
                                    {
                                        selected==='dists'?
                                        <DistributorView/>
                                        :null
                                    }
                                    {
                                        selected==='locations'?
                                        <LocationView/>
                                        :null
                                    }
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

