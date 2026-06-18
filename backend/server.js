require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const connectDB = require("./src/config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.get("/", (req, res) => {
  res.send("TaskFlow API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});