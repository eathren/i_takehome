const express = require("express");
const cors = require("cors");
import secretRoutes from "./routes/secretRoutes";

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api", secretRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
