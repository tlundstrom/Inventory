import {createTheme, ThemeProvider, Container, Box, CssBaseline } from "@mui/material"
import Locations from '../components/Locations';
const theme = createTheme();

const LocationView = (props) =>{
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Locations />
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default LocationView