import { Route, Routes, useNavigate, usepath, Navigate } from "react-router-dom";
import { Box, Button, Grid, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CreateDistributor from "../components/CreateDistributor";
import CreateItem from "../components/CreateItem";
import CreateLocation from "../components/CreateLocation";
const theme = createTheme();

const CreateAll = (props) => {
	const navigate = useNavigate();
	const path = window.location.pathname;

	const ForwardUrl = () => {
		if (path === "/items/create") {
			return <Route element={<CreateItem />} path="" />;
		} else if (path === "/distributors/create") {
			return <Route element={<CreateDistributor />} path="" />;
		} else if (path === "/locations/create") {
			return <Route element={<CreateLocation />} path="" />;
		} else {
			navigate("/items");
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Grid item xs={12}>
				<Paper
					sx={{
						p: 2,
					}}
				>
					<Button onClick={() => navigate(-1)}>Back</Button>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Routes>{ForwardUrl()}</Routes>
					</Box>
				</Paper>
			</Grid>
		</ThemeProvider>
	);
};

export default CreateAll;
