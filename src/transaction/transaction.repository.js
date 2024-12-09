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
  const newTransaction = await prisma.transaction.create({
    data: transaction,
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
