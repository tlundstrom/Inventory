import {Grid, Paper, createTheme, ThemeProvider, Container, CssBaseline, Box, Button, InputAdornment, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
const theme = createTheme({
    components: {
        MuiListItemSecondaryAction: {
            styleOverrides: {
                root: {
                    width:'50%',
                },
            },
        },
    },
});

const Inventory = (props)=>{
    const [itemList, setItemList] = useState([]);
    const [value, setValue] = useState(0);

    useEffect(()=>{
        axios
        .get("http://localhost:8000/api/items", {withCredentials: true})
        .then(res => {
            setItemList(res.data);
        })
        .catch(err => console.error(err));
    }, [])

    const calcValue = (items)=>{
        let tempVal = 0;
        items.map((item, index)=>{
            tempVal+=item.cost*item.amount;
        })
        return tempVal;
    }

    useEffect(()=>{
        setValue(calcValue(itemList).toFixed(2));
    },[itemList])

    const handleChange = (e, index, item) =>{
        let newItem = item;
        let newItemList = [...itemList];
        console.log(newItem);
        newItem[e.target.name] = e.target.value
        console.log(newItem[e.target.name]);
        newItemList[index] = newItem;
        setItemList(newItemList);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        itemList.map((item, index)=>{
            axios.put(`http://localhost:8000/api/items/${item._id}`, item, {withCredentials: true})
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => console.error(err))
                
        })
    }

    return(
        <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Grid item xs={12} >
                    <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Typography component="h1" variant="h5">Current Inventory Value: ${value}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                        <Typography component="h1" variant="h5">Take Inventory</Typography>
                    <List  sx={{marginTop:2, marginBottom:2, width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {itemList.map((item, index) => (
                            <ListItem
                            key={index}

                            secondaryAction={
                                <TextField
                                position="end"
                                size="small"
                                margin="normal"
                                id="amount"
                                label="Stock Level"
                                name="amount"
                                onChange={(e)=>{handleChange(e, index, item)}}
                                value={item.amount}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">{item.unit}</InputAdornment>,
                                }}
                                />
                            }
                            >
                                <ListItemText primary={item.name} />
                            </ListItem>
                        ))}
                    </List>
                    <Button  sx={{width:.5}} onClick={(e)=>{handleSubmit(e)}} variant="contained">Save</Button>
                    </Paper>
                </Grid>
                <Box
                    sx={{
                        marginTop: 4,
                        marginBottom: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    
                    
                </Box>
        </ThemeProvider>
    )
}

export default Inventory