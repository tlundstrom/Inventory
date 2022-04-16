
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
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
import MobileHeader from '../components/MobileHeader';
import MobileFooter from '../components/MobileFooter';
import Inventory from '../components/Inventory';

const theme = createTheme();

const Mobile = (props) =>{
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display:'flex'}}>
                <CssBaseline/>
                <MobileHeader/>
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
                        display:'flex',
                        flexDirection:'column'
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
                                        <Route element={<Inventory/>} path="/"/>
                                        <Route element={<ItemDetails/>} path="/items/edit/:id"/>
                                        <Route element={<CreateItem/>} path="/items/new"/>
                                        <Route element={<CreateLocation/>} path="locations/new"/>
                                        <Route element={<LocationDetails />} path="/locations/edit/:id"/>
                                        <Route element={<Locations/>} path="/locations"/>
                                    </Routes>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                    <MobileFooter/>
                </Box>
            </Box>
            
        </ThemeProvider>
    )
}

export default Mobile

