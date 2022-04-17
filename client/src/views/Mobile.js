import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Toolbar } from "@mui/material";
import Distributors from "../components/Distributors";
import Items from "../components/Items";
import Locations from "../components/Locations";
import { Route, Routes } from "react-router-dom";
import MobileHeader from "../components/MobileHeader";
import MobileFooter from "../components/MobileFooter";
import Inventory from "../components/Inventory";
import CreateAll from "./Create";
import Update from "./Update";

const theme = createTheme();

const Mobile = (props) => {
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<MobileHeader />
				<Box
					component="main"
					sx={{
						backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
						flexGrow: 1,
						minHeight: "100vh",
						overflow: "auto",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Toolbar />
					<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
						<Grid container spacing={3}>
							<Routes>
								<Route path="items">
									<Route element={<CreateAll />} path="create" />
									<Route element={<Items />} path="" />
									<Route element={<Update />} path="update/:id/*" />
								</Route>
								<Route path="distributors">
									<Route element={<CreateAll />} path="create" />
									<Route element={<Distributors />} path="" />
									<Route element={<Update />} path="update/:id" />
								</Route>
								<Route path="locations">
									<Route element={<CreateAll />} path="create" />
									<Route element={<Locations />} path="" />
									<Route element={<Update />} path="update/:id" />
								</Route>
								<Route element={<Inventory />} path="/*" />
							</Routes>
						</Grid>
					</Container>
					<MobileFooter />
				</Box>
			</Box>
		</ThemeProvider>
	);
};

export default Mobile;
