const express = require("express");
const { getTransactionsByUser, createTransaction } = require("./transaction.service");
const { error } = require("console");
const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await getTransactionsByUser(userId);

    res.send(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", (req, res) => {
  const transaction = req.body;

  if (!transaction.type || !transaction.category || !transaction.amount || !transaction.date) {
    return res.status(400).send(error.message);
  }

  const newTransaction = createTransaction(transaction);

  res.send({
    data: newTransaction,
    message: "Transaction created successfully",
    status: 201,
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const transaction = req.body;

  if (!transaction.type || !transaction.category || !transaction.amount || !transaction.date) {
    return res.status(400).send(error.message);
  }

  const updatedTransaction = updateTransaction(id, transaction);

  res.send({
    data: updatedTransaction,
    message: "Transaction updated successfully",
    status: 200,
  });
});

module.exports = router;
