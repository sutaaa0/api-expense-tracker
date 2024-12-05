const { findTransactionsByUser } = require("./transaction.repository");

const getTransactionsByUser = async (userId) => {
    const transactions = await findTransactionsByUser(userId);

    if (!transactions) {
        throw new Error("User not found");
    }

    return transactions
}

module.exports = { getTransactionsByUser }