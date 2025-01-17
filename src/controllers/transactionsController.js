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