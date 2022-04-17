import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import ItemForm from "./ItemForm";
import { useParams, useNavigate } from "react-router-dom";

const ItemDetails = (props) => {
	const navigate = useNavigate();
	const [initialItem, setInitialItem] = useState({});
	const [loaded, setLoaded] = useState(false);
	const [errors, setErrors] = useState({});
	const { id } = useParams();

	useEffect(() => {
		let isMounted = true;
		axios
			.get(`http://localhost:8000/api/items/${id}`, { withCredentials: true })
			.then((res) => {
				if (isMounted) {
					setInitialItem(res.data);
					setLoaded(true);
					console.log(initialItem);
				}
			})
			.catch((err) => {
				navigate("/items");
				setLoaded(false);
			});
		return () => (isMounted = false);
	}, []);

	const updateItem = (initialItem) => {
		axios
			.put(`http://localhost:8000/api/items/${id}`, initialItem, { withCredentials: true })
			.then((res) => {
				navigate("/home/items");
			})
			.catch((err) => {
				console.log(err);
				//setErrors(err.response.data.errors);
			});
	};

	return (
		<>
			<Typography component="h1" variant="h5">
				Edit {initialItem.name}
			</Typography>
			{loaded && !errors.message ? <ItemForm errors={errors} initialItem={initialItem} submitProp={updateItem} /> : <p>{errors.message}</p>}
		</>
	);
};

export default ItemDetails;
