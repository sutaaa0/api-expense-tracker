const express = require("express");
const { getTransactionsByUser, createTransaction, getMonthlyTransactionsByUser } = require("./transaction.service");
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

router.get("/:userId/monthly-summary", async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await getMonthlyTransactionsByUser(userId);

    res.send(transactions);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const transaction = req.body;

    if (!transaction.type || !transaction.category || !transaction.amount || !transaction.date) {
      return res.status(400).send("All fields are required");
    }

    const newTransaction = await createTransaction(transaction);

    res.status(201).send({
      data: newTransaction,
      message: "Transaction created successfully",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/income", async (req, res) => {
  try {
    const transaction = req.body;

    if (!transaction.type || !transaction.category || !transaction.amount || !transaction.date) {
      return res.status(400).send("All fields are required");
    }

    const newTransaction = await createTransaction(transaction);

    res.status(201).send({
      data: newTransaction,
      message: "Transaction created successfully",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = req.body;

    if (!id) {
      return res.status(400).send("Transaction ID is required");
    }

    if (!transaction.type || !transaction.category || !transaction.amount || !transaction.date) {
      return res.status(400).send("All fields are required");
    }

    const updatedTransaction = await updateTransaction(id, transaction);

    res.status(200).send({
      data: updatedTransaction,
      message: "Transaction updated successfully",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
