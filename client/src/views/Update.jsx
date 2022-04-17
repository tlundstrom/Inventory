import { useParams, useNavigate, Route, Routes } from "react-router-dom";
import DistributorDetails from "../components/DistributorDetails";
import ItemDetails from "../components/ItemDetails";
import LocationDetails from "../components/LocationDetails";
import { Box, ThemeProvider, Grid, Paper, Button, createTheme } from "@mui/material";
const theme = createTheme();

const Update = (props) => {
	const navigate = useNavigate();
	const path = window.location.pathname;
	const { id } = useParams();

	const ForwardUrl = () => {
		if (path === `/items/update/${id}`) {
			return <Route element={<ItemDetails />} path="" />;
		} else if (path === `/distributors/update/${id}`) {
			return <Route element={<DistributorDetails />} path="" />;
		} else if (path === `/locations/update/${id}`) {
			return <Route element={<LocationDetails />} path="" />;
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
							justifyContent: "space-around",
						}}
					>
						<Routes>{ForwardUrl()}</Routes>
					</Box>
				</Paper>
			</Grid>
		</ThemeProvider>
	);
};

export default Update;
