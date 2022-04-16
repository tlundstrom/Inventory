import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


const MobileHeader = (props) =>{
    return (
        <MuiAppBar position='absolute'>
            <Toolbar sx={{pr: '24px'}}>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                    >
                    Dry Storage
                </Typography>
                <section>
                </section>
            </Toolbar>
        </MuiAppBar>
    )
}
export default MobileHeader