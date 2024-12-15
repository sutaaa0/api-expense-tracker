const prisma = require("../db/prisma");

const findTransactionsByUser = async (userId) => {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: userId,
    },
  });
  return transactions;
};

const findIncomeTransactionsByUser = async (userId) => {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: userId,
      type: "income",
    },
    orderBy: {
      date: "desc",
    },
    take: 3,
  });
  return transactions;
};

const insertTransaction = async (transaction) => {
  const formattedDate = new Date(transaction.date).toISOString(); // Konversi ke ISO-8601
  const newTransaction = await prisma.transaction.create({
    data: {
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount,
      date: formattedDate,
      notes: transaction.notes,
      userId: transaction.userId,
    },
  });
  return newTransaction;
};

const findMonthlyTransactionsByUser = async (userId) => {
  const currentMonthStart = new Date();
  currentMonthStart.setDate(1); // Set to the first day of the current month
  currentMonthStart.setHours(0, 0, 0, 0); // Set time to midnight

  const transactions = await prisma.transaction.groupBy({
    by: ["category"],
    where: {
      userId: userId,
      type: "expense",
      date: {
        gte: currentMonthStart, // Greater than or equal to the first day of the month
      },
    },
    _sum: {
      amount: true,
    },
  });

  return transactions;
};

const findMonthlyIncomeTransactionsByUser = async (userId) => {
  const currentMonthStart = new Date();
  currentMonthStart.setDate(1); // Set to the first day of the current month
  currentMonthStart.setHours(0, 0, 0, 0); // Set time to midnight

  const incomes = await prisma.transaction.groupBy({
    by: ["category"],
    where: {
      userId: userId,
      type: "income",
      date: {
        gte: currentMonthStart, // Greater than or equal to the first day of the month
      },
    },
    _sum: {
      amount: true,
    },
  });

  return incomes;
};

const editTransaction = async (id, transaction) => {
  const existingTransaction = await prisma.transaction.findUnique({ where: { id } });
  if (!existingTransaction) {
    throw new Error("Transaction not found");
  }

  const updatedTransaction = await prisma.transaction.update({
    where: {
      id: id,
    },
    data: transaction,
  });
  return updatedTransaction;
};

module.exports = { findTransactionsByUser, insertTransaction, editTransaction, findMonthlyTransactionsByUser, findIncomeTransactionsByUser, findMonthlyIncomeTransactionsByUser };
