import { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DashHeader from "../components/DashHeader";
import DashSidebar from "../components/DashSidebar";
import { Toolbar } from "@mui/material";
import Distributors from "../components/Distributors";
import Items from "../components/Items";
import Locations from "../components/Locations";
import { Route, Routes, Navigate } from "react-router-dom";
import Inventory from "../components/Inventory";
import CreateAll from "./Create";
import Update from "./Update";

const drawerWidth = 240;
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
	"& .MuiDrawer-paper": {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: "border-box",
		...(!open && {
			overflowX: "hidden",
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(9),
			},
		}),
	},
}));

const theme = createTheme();

const Dashboard = (props) => {
	const [open, setOpen] = useState(false);
	const toggleDrawer = () => {
		setOpen(!open);
	};

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<DashHeader open={open} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} />
				<DashSidebar Drawer={Drawer} open={open} toggleDrawer={toggleDrawer} />
				<Box
					component="main"
					sx={{
						backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
						flexGrow: 1,
						height: "100vh",
						overflow: "auto",
					}}
				>
					<Toolbar />
					<Container maxWidth="50%" sx={{ mt: 4, mb: 4 }}>
						<Grid container spacing={3}>
							<Routes>
								<Route path="items">
									<Route element={<CreateAll />} path="create/*" />
									<Route element={<Items />} path="" />
									<Route element={<Update />} path="update/:id/*" />
								</Route>
								<Route path="distributors">
									<Route element={<CreateAll />} path="create/*" />
									<Route element={<Distributors />} path="" />
									<Route element={<Update />} path="update/:id/*" />
								</Route>
								<Route path="locations">
									<Route element={<CreateAll />} path="create/*" />
									<Route element={<Locations />} path="" />
									<Route element={<Update />} path="update/:id/*" />
								</Route>
								<Route element={<Inventory />} path="/" />
							</Routes>
						</Grid>
					</Container>
				</Box>
			</Box>
		</ThemeProvider>
	);
};

export default Dashboard;
