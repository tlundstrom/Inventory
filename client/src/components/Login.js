import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const theme = createTheme();

const Login = (props) => {
	const { login } = useContext(UserContext);
	const navigate = useNavigate();
	const { toggleForm } = props;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post(
				"http://localhost:8000/api/users/login",
				{
					email: email,
					password: password,
				},
				{
					withCredentials: true,
				}
			)
			.then((res) => {
				login();
				navigate("/");
			})
			.catch((err) => {
				console.error(err);
				setErrors(err.response.data);
				console.log(errors);
			});
	};
	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 4,
						marginBottom: 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography component="h1" variant="h5">
						Sign in{" "}
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							error={!!errors.message}
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							error={!!errors.message}
							margin="normal"
							required
							fullWidth
							type="password"
							id="password"
							label="Password"
							name="password"
							autoComplete="current-password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{errors ? <Typography sx={{ color: theme.palette.error.main, textAlign: "center" }}>{errors.message}</Typography> : null}
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							Sign In
						</Button>
					</Box>
				</Box>
				<Grid container justifyContent={"flex-end"}>
					<Grid item>
						<Link component={RouterLink} variant="body2" onClick={toggleForm} to="#">
							Need an Account?
						</Link>
					</Grid>
				</Grid>
			</Container>
		</ThemeProvider>
	);
};

export default Login;
