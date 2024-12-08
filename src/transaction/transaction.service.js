const { findTransactionsByUser, insertTransaction } = require("./transaction.repository");

const getTransactionsByUser = async (userId) => {
    const transactions = await findTransactionsByUser(userId);

    if (!transactions) {
        throw new Error("User not found");
    }

    return transactions
}

const createTransaction = async (transaction) => {
    const newTransaction = await insertTransaction(transaction);

    return newTransaction
}

const updateTransaction = async (id, transaction) => {
    const updatedTransaction = await editTransaction(id, transaction);

    return updatedTransaction
}

module.exports = { getTransactionsByUser, createTransaction };