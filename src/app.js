const express = require("express");
const cors = require("cors");
const transactionRoutes = require("./routes/transactionRoutes");  // Pastikan impor ini benar

const corsOptions = {
  origin: 'http://localhost:3000', // Ganti dengan URL frontend Anda jika berbeda
  methods: 'GET,POST,PUT,DELETE,PATCH',
  allowedHeaders: 'Content-Type, Authorization',
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/transactions", transactionRoutes);  // Pastikan ini benar

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
