const express = require("express");
const transactionController = require("../controllers/transactionController");

const router = express.Router();

// Create Transaction
router.post("/", transactionController.create);

// Get Transactions by User
router.get("/:userId", transactionController.getByUser);

// Update Transaction
router.put("/:id", transactionController.update);

// Delete Transaction
router.delete("/:id", transactionController.delete);

module.exports = router;  // Pastikan ekspor router dilakukan dengan benar
