import { db } from "../config/database.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const user = req.body;

  try {
    const registeredUser = await db.collection("users").findOne({ email: user.email });
    if (registeredUser) {
      return res.status(httpStatus.CONFLICT).send("Email already registered");
    }

    await db.collection("users").insertOne({
      ...user,
      password: bcrypt.hashSync(user.password, 10)
    });
    return res.status(httpStatus.CREATED).send("User registered!");
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}