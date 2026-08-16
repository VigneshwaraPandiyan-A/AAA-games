require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDb = require("./Config/db");
const { connectRedis } = require("./Config/redis");
const orderRoutes = require("./Routes/OrderRoute");
const productRoutes = require("./Routes/ProductRoute");
const userRoutes = require("./Routes/UserRoute");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", orderRoutes);
app.use("/", productRoutes);
app.use("/", userRoutes);

connectRedis();

connectToDb();
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});