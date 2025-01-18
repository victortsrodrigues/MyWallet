import { ObjectId } from "mongodb";
import { db } from "../config/database.js";
import httpStatus from "http-status";

export async function creatTransaction(req, res) {
  const transaction = req.body;
  try {
    await db.collection("transactions").insertOne({
      ...transaction,
      user: res.locals.user._id
    });
    res.status(httpStatus.CREATED).send("Transaction created!");
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function readTransactions(req, res) {
  const page = req.query.page || 1;
  // Check if page query is a positive
  if (page <= 0 || !Number.isInteger(page)) {
    return res.status(httpStatus.BAD_REQUEST).send("Page number must a positive integer.");
  }
  const limit = 10;
  const skip = (page - 1) * limit;
  try {
    // Read sorted transactions
    const transactions = await db.collection("transactions").find({ user: res.locals.user._id }).skip(skip).limit(limit).sort({ _id: -1 }).toArray();
    return res.status(httpStatus.OK).send(transactions);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function updateTransactions(req, res) {
  const { id } = req.params;
  const transaction = req.body;
  try {
    // Check if transaction exists
    const registeredTransaction = await db.collection("transactions").findOne({ _id: new ObjectId(id) });
    if (!registeredTransaction) {
      return res.status(httpStatus.NOT_FOUND).send("Transaction not found!");
    }
    // Check if user is the owner of the transaction
    if (!registeredTransaction.user.equals(res.locals.user._id)) {
      return res.status(httpStatus.UNAUTHORIZED).send('You can only update your own transactions!');
    }
    // Update transaction
    await db.collection("transactions").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          value: transaction.value,
          description: transaction.description,
          type: transaction.type
        }
      }
    );
    res.status(httpStatus.NO_CONTENT).send('Transaction updated!');
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function deleteTransaction(req, res) {
  const { id } = req.params;
  try {
    // Check if transaction exists
    const registeredTransaction = await db.collection("transactions").findOne({ _id: new ObjectId(id) });
    if (!registeredTransaction) {
      return res.status(httpStatus.NOT_FOUND).send("Transaction not found!");
    }
    // Check if user is the owner of the transaction
    if (!registeredTransaction.user.equals(res.locals.user._id)) {
      return res.status(httpStatus.UNAUTHORIZED).send('You can only delete your own transactions!');
    }
    // Delete transaction
    await db.collection("transactions").deleteOne({ _id: new ObjectId(id) });
    res.status(httpStatus.NO_CONTENT).send('Transaction deleted!');
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}