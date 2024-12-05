const express = require("express");
const { getTransactionsByUser } = require("./transaction.service");
const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params
    const transactions = await getTransactionsByUser(userId);

    res.send(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
