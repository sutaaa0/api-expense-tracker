const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();


app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

const transactionRoutes = require("./transaction/transaction.controller");

app.use("/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})