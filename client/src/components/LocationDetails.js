import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import LocationForm from "./LocationForm";
import { useNavigate, useParams } from "react-router-dom";

const LocationDetails = (props) => {
	const navigate = useNavigate();
	const [initialLocation, setInitialLocation] = useState({});
	const [loaded, setLoaded] = useState(false);
	const [errors, setErrors] = useState({});
	const { id } = useParams();

	useEffect(() => {
		let isMounted = true;
		axios
			.get(`http://localhost:8000/api/locations/${id}`, { withCredentials: true })
			.then((res) => {
				if (isMounted) {
					setInitialLocation(res.data);
					setLoaded(true);
				}
			})
			.catch((err) => {
				console.log(err);
				setErrors(err.response.data);
				setLoaded(false);
			});
		return () => (isMounted = false);
	});

	const updateLocation = (initialLocation) => {
		axios
			.put(`http://localhost:8000/api/locations/${id}`, initialLocation, { withCredentials: true })
			.then((res) => {
				navigate("/home/locations");
			})
			.catch((err) => {
				console.log(err);
				setErrors(err.response.data.errors);
			});
	};

	return (
		<>
			<Typography component="h1" variant="h5">
				Edit {initialLocation.name}
			</Typography>
			{loaded && !errors.message ? (
				<LocationForm errors={errors} initialLocation={initialLocation} submitProp={updateLocation} />
			) : (
				<p>{errors.message}</p>
			)}
		</>
	);
};

export default LocationDetails;
