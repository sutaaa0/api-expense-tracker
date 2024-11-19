const prisma = require("../db/prisma");

exports.createTransaction = async ({ type, category, amount, date, notes, userId }) => {
  return await prisma.transaction.create({
    data: {
      type,
      category,
      amount,
      date: new Date(date),
      notes,
      userId,
    },
  });
};

exports.getTransactionsByUser = async (userId) => {

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return await prisma.transaction.findMany({
    where: {
      userId: userId,
    },
  });
};

exports.updateTransaction = async ({ id, type, category, amount, date, notes }) => {
  const transaction = await prisma.transaction.findUnique({
    where: {
      id,
    },
  })

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  return await prisma.transaction.update({
    where: {
      id,
    },
    data: {
      type,
      category,
      amount,
      date: new Date(date),
      notes,
    },
  });
};

exports.deleteTransactions = async (id) => {
  console.log(id)

  const transaction = await prisma.transaction.findUnique({
    where: {
      id,
    },
  })

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  return await prisma.transaction.delete({
    where: {
      id,
    },
  });
};