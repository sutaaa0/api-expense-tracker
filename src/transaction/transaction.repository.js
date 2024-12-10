const prisma = require("../db/prisma");

const findTransactionsByUser = async (userId) => {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: userId,
    },
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


module.exports = { findTransactionsByUser, insertTransaction, editTransaction };
