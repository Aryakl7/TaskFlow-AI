require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const empRoute = require("./routes/empRoute");
const taskRoute = require("./routes/taskRoute");

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MONGODB Connected"))
.catch(err => console.error(err));


app.use("/api/emp", empRoute);
app.use("/api/task", taskRoute);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log("Server running on PORT",PORT));