import { useState } from "react";

import { FormControlLabel, Checkbox, Box, TextField, Button, MenuItem } from "@mui/material";

const LocationForm = (props) => {
	const { errors, initialLocation, submitProp } = props;
	const [location, setLocation] = useState(initialLocation);

	const handleChange = (e) => {
		setLocation({
			...location,
			[e.target.name]: e.target.value,
		});
	};
	const handleChecked = (e) => {
		setLocation({
			...location,
			reminders: !location.reminders,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		submitProp(location);
		console.log(errors);
	};
	return (
		<Box maxWidth="50%" component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
			<TextField
				error={!!errors.name}
				helperText={errors.name ? errors.name.message : null}
				size="small"
				margin="normal"
				required
				fullWidth
				id="name"
				label="Location Name"
				name="name"
				value={location.name}
				onChange={(e) => {
					handleChange(e);
				}}
			/>
			<TextField
				error={!!errors.temp}
				helperText={errors.temp ? errors.temp.message : null}
				size="small"
				select
				margin="normal"
				required
				fullWidth
				id="temp"
				label="Location Type"
				name="temp"
				value={location.temp}
				onChange={(e) => {
					handleChange(e);
				}}
			>
				<MenuItem value={"Dry Storage"}>Dry Storage</MenuItem>
				<MenuItem value={"Refrigerated"}>Refrigerated</MenuItem>
				<MenuItem value={"Frozen"}>Frozen</MenuItem>
			</TextField>
			<TextField
				error={!!errors.schedule}
				helperText={errors.schedule ? errors.schedule.message : null}
				size="small"
				select
				margin="normal"
				required
				fullWidth
				id="schedule"
				label="Inventory Frequency"
				name="schedule"
				value={location.schedule}
				onChange={(e) => {
					handleChange(e);
				}}
			>
				<MenuItem value={"DNI"}>Do Not Inventory</MenuItem>
				<MenuItem value={"Monthly"}>Monthly</MenuItem>
				<MenuItem value={"Quarterly"}>Quarterly</MenuItem>
				<MenuItem value={"Bi-Yearly"}>Bi-Yearly</MenuItem>
				<MenuItem value={"Yearly"}>Yearly</MenuItem>
			</TextField>
			<FormControlLabel control={<Checkbox checked={location.reminders} onChange={handleChecked} />} label="Inventory Reminders" />
			<Button size="small" type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
				Submit
			</Button>
		</Box>
	);
};

export default LocationForm;
