const express = require("express");
const { getTransactionsByUser, createTransaction, getMonthlyTransactionsByUser, getIncomeTransactionsByUser, getMonthlyIncomeByUser } = require("./transaction.service");
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

router.get("/:userId/totalExpense/monthly-summary", async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await getMonthlyTransactionsByUser(userId);

    const totalExpense = transactions.reduce((acc, transaction) => acc + transaction.totalAmount, 0);

    res.send({ totalExpense });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/:userId/income/monthly-summary", async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await getMonthlyIncomeByUser(userId);

    res.send(transactions);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/:userId/totalIncome/monthly-summary", async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await getMonthlyIncomeByUser(userId);

    const totalIncome = transactions.reduce((acc, transaction) => acc + transaction.totalAmount, 0);

    res.send({ totalIncome });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/:userId/history-income", async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await getIncomeTransactionsByUser(userId);

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

router.post("/:userId/budget", async (req, res) => {
  try {
    const { userId } = req.params;
    const budgetData = req.body;
    const budget = await createBudget(userId, budgetData);

    res.status(201).send(budget);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/:userId/budget", async (req, res) => {
  try {
    const { userId } = req.params;
    const budget = await getBudgetByUser(userId);

    res.send(budget);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.put("/:userId/budget", async (req, res) => {
  try {
    const { userId } = req.params;
    const budgetData = req.body;
    const updatedBudget = await updateBudget(userId, budgetData);

    res.send(updatedBudget);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
