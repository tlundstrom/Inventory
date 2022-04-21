require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.MY_PORT;

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Routes for API
require("./config/mongoose.config");
require("./routes/items.routes")(app);
require("./routes/users.routes")(app);
require("./routes/distributors.routes")(app);
require("./routes/locations.routes")(app);

app.listen(port, () => console.log(`Listening on port: ${process.env.MY_PORT}`));
