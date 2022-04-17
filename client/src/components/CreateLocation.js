import Typography from "@mui/material/Typography";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LocationForm from "./LocationForm";

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
		<>
			<Typography component="h1" variant="h5">
				Enter a new Location
			</Typography>
			<LocationForm errors={errors} initialLocation={initialLocation} submitProp={createLocation} />
		</>
	);
};

export default CreateLocation;
