const { findTransactionsByUser, insertTransaction, findMonthlyTransactionsByUser, findIncomeTransactionsByUser, findMonthlyIncomeTransactionsByUser, editTransaction } = require("./transaction.repository");

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

const insertBudget = async (userId, budgetData) => {
  const budget = await .
};

const findBudgetByUser = async (userId) => {
  const budget = await prisma.budget.findMany({
    where: {
      userId: userId,
    },
  });
  return budget;
};

const editBudget = async (userId, budgetData) => {
  const existingBudget = await prisma.budget.findFirst({
    where: {
      userId: userId,
      category: budgetData.category,
    },
  });

  if (!existingBudget) {
    throw new Error("Budget not found");
  }

  const updatedBudget = await prisma.budget.update({
    where: {
      id: existingBudget.id,
    },
    data: budgetData,
  });
  return updatedBudget;
};

module.exports = { getTransactionsByUser, createTransaction, getMonthlyTransactionsByUser, getIncomeTransactionsByUser, getMonthlyIncomeByUser, updateTransaction, insertBudget, findBudgetByUser, editBudget };
