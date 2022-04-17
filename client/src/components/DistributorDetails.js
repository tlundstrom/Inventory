import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DistributorForm from "./DistributorForm";

const DistributorDetails = (props) => {
	const navigate = useNavigate();
	const [initialDistributor, setInitialDistributor] = useState({});
	const [loaded, setLoaded] = useState(false);
	const [errors, setErrors] = useState({});
	const { id } = useParams();
	console.log(id);

	useEffect(() => {
		let isMounted = true;
		axios
			.get(`http://localhost:8000/api/distributors/${id}`, { withCredentials: true })
			.then((res) => {
				if (isMounted) {
					setInitialDistributor(res.data);
					console.log(res.data);
					setLoaded(true);
				}
			})
			.catch((err) => {
				navigate("/distributors");
				setLoaded(false);
			});
		return () => (isMounted = false);
	}, []);

	const updateDistributor = (initialDistributor) => {
		axios
			.put(`http://localhost:8000/api/distributors/${id}`, initialDistributor, { withCredentials: true })
			.then((res) => {
				navigate("/home/distributors");
			})
			.catch((err) => {
				console.log(err);
				setErrors(err.response.data.errors);
			});
	};

	return (
		<>
			<Typography component="h1" variant="h5">
				Edit {initialDistributor.distName}
			</Typography>
			{loaded && !errors.message ? (
				<DistributorForm errors={errors} initialDistributor={initialDistributor} submitProp={updateDistributor} />
			) : (
				<p>{errors.message}</p>
			)}
		</>
	);
};

export default DistributorDetails;
