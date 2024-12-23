const { findTransactionsByUser, insertTransaction, findMonthlyTransactionsByUser, findIncomeTransactionsByUser, findMonthlyIncomeTransactionsByUser, editTransaction, insertBudget, findBudgetByUser, editBudget } = require("./transaction.repository");

const getTransactionsByUser = async (userId) => {
  const transactions = await findTransactionsByUser(userId);

  if (!transactions) {
    throw new Error("User not found");
  }

  return transactions;
};

const getIncomeTransactionsByUser = async (userId) => {
  const transactions = await findIncomeTransactionsByUser(userId);

  if (!transactions || transactions.length === 0) {
    throw new Error("No transactions found for this month");
  }

  return transactions.filter((transaction) => transaction.type === "income");
};

const getMonthlyIncomeByUser = async (userId) => {
  const incomes = await findMonthlyIncomeTransactionsByUser(userId);

  if (!incomes || incomes.length === 0) {
    throw new Error("No income found for this month");
  }

  return incomes.map((income) => ({
    category: income.category,
    totalAmount: income._sum.amount,
  }));
};

const getMonthlyTransactionsByUser = async (userId) => {
  const transactions = await findMonthlyTransactionsByUser(userId);

  if (!transactions || transactions.length === 0) {
    throw new Error("No transactions found for this month");
  }

  return transactions.map((transaction) => ({
    category: transaction.category,
    totalAmount: transaction._sum.amount,
  }));
};

const createTransaction = async (transaction) => {
  const newTransaction = await insertTransaction(transaction);

  return newTransaction;
};

const updateTransaction = async (id, transaction) => {
  const updatedTransaction = await editTransaction(id, transaction);

  return updatedTransaction;
};

const createBudget = async (userId, budgetData) => {
  const newBudget = await insertBudget(userId, budgetData);

  return newBudget;
};

const getBudgetByUser = async (userId) => {
  const budget = await findBudgetByUser(userId);

  if (!budget) {
    throw new Error("Budget not found");
  }

  return budget;
};


const updateBudget = async (userId, budgetData) => {
  const updatedBudget = await editBudget(userId, budgetData);

  return updatedBudget;
};

module.exports = { getTransactionsByUser, createTransaction, getMonthlyTransactionsByUser, getIncomeTransactionsByUser, getMonthlyIncomeByUser, updateTransaction, createBudget, getBudgetByUser, updateBudget };
