const { createTransaction, getTransactionsByUser, updateTransaction, deleteTransactions } = require("../services/transactionService");

exports.create = async (req, res) => {
  const { type, category, amount, date, notes, userId } = req.body;

  try {
    const newTransaction = await createTransaction({ type, category, amount, date, notes, userId });
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await getTransactionsByUser(userId);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;

  console.log("id :", id);

  if (!req.body.type || !req.body.category || !req.body.amount || !req.body.date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { type, category, amount, date, notes } = req.body;

  try {
    const updatedTransaction = await updateTransaction({ id, type, category, amount, date, notes });
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTransaction = await deleteTransactions(id);
    res.status(200).json(deletedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
