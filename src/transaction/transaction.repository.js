const prisma = require("../db/prisma");

const findTransactionsByUser = async (userId) => {
    console.log(userId);
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: userId,
    },
  });
  return transactions;
};

module.exports = { findTransactionsByUser };