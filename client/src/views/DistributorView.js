import {createTheme, ThemeProvider, Container, Box, CssBaseline } from "@mui/material"
import Distributors from "../components/Distributors";
const theme = createTheme();

const DistributorView = (props) =>{
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
                    <Distributors />
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default DistributorView