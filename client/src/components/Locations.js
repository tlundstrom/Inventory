import { createTheme, ThemeProvider, Grid, Paper, IconButton, List, ListItem, ListItemText } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";
import { Typography, Dialog, Button, DialogContent, DialogActions, DialogContentText, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

const theme = createTheme();
const Locations = (props) => {
	const [locationList, setLocationList] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [locationDelete, setLocationDelete] = useState({});
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/locations", { withCredentials: true })
			.then((res) => {
				setLocationList(res.data);
				setLoaded(true);
			})
			.catch((err) => console.error(err));
	}, []);

	const handleOpen = (location) => {
		setLocationDelete(location);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleDelete = async () => {
		axios
			.delete(`http://localhost:8000/api/locations/${locationDelete._id}`, {
				withCredentials: true,
			})
			.then((res) => {
				setLocationList(locationList.filter((location) => location._id !== locationDelete._id));
				console.log(locationDelete.name + " Succussfully Deleted");
			})
			.catch((err) => console.error(err));
		handleClose();
	};

	const handleEdit = (id) => {
		navigate(`edit/${id}`);
	};

	return (
		<ThemeProvider theme={theme}>
			<Grid item xs={12}>
				<Paper
					sx={{
						p: 2,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography component="h1" variant="h5">
						All Locations
					</Typography>
					<List sx={{ marginTop: 2, marginBottom: 2, width: "100%", maxWidth: 360 }}>
						{loaded &&
							locationList.map((location, index) => {
								return (
									<ListItem
										key={index}
										secondaryAction={
											<section>
												<IconButton onClick={() => handleOpen(location)}>
													<DeleteForeverIcon />
												</IconButton>
												<IconButton onClick={() => handleEdit(location._id)}>
													<EditIcon />
												</IconButton>
											</section>
										}
									>
										<ListItemText primary={location.name} />
									</ListItem>
								);
							})}
					</List>
					<Button
						sx={{ width: 0.5 }}
						onClick={() => {
							navigate("new");
						}}
						variant="contained"
					>
						Add Location
					</Button>
				</Paper>
			</Grid>
			<Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{"Confirm Location Delete"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Deleting a location is permentant and cannot be undone. <br />
						<br /> Do you wish you to continue deleting {locationDelete.name}?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} autoFocus>
						Cancel
					</Button>
					<Button onClick={handleDelete}>Delete</Button>
				</DialogActions>
			</Dialog>
		</ThemeProvider>
	);
};

export default Locations;
