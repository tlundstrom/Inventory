import Typography from "@mui/material/Typography";
import { Grid, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LocationForm from "./LocationForm";
const theme = createTheme();

const CreateLocation = (props) => {
	const navigate = useNavigate();
	const [initialLocation, setInitialLocation] = useState({
		name: "",
		temp: "",
		schedule: "",
		reminders: true,
	});
	const [errors, setErrors] = useState({});

	const createLocation = (location) => {
		axios
			.post("http://localhost:8000/api/locations", location, { withCredentials: true })
			.then((res) => {
				console.log(res);
				navigate("/home/items");
			})
			.catch((err) => {
				console.error(err);
				setErrors(err.response.data.errors);
			});
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
						Enter a new Location
					</Typography>
					<LocationForm errors={errors} initialLocation={initialLocation} submitProp={createLocation} />
				</Paper>
			</Grid>
		</ThemeProvider>
	);
};

export default CreateLocation;
