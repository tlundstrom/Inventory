import {createTheme, ThemeProvider, Container, Box, CssBaseline } from "@mui/material"
import Items from "../components/Items";
const theme = createTheme();

const ItemsView = (props) =>{
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
                    <Items />
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default ItemsView