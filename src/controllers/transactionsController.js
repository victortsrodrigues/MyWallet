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
  if (page <= 0) {
    return res.status(httpStatus.BAD_REQUEST).send("Page number must a positive integer.");
  }
  const limit = 10;
  const skip = (page - 1) * limit;
  try {
    const transactions = await db.collection("transactions").find({ user: res.locals.user._id }).skip(skip).limit(limit).sort({ _id: -1 }).toArray();
    console.log(transactions)
    return res.status(httpStatus.OK).send(transactions);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}