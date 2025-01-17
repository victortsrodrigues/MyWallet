import { db } from "../config/database.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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

export async function signIn(req, res) {
  const user = req.body;

  try {
    const registeredUser = await db.collection("users").findOne({ email: user.email });
    if (!registeredUser) {
      return res.status(httpStatus.NOT_FOUND).send("Invalid email or password!");
    }
    if (registeredUser && bcrypt.compareSync(user.password, registeredUser.password)) {
      const token = jwt.sign({userId: registeredUser._id}, process.env.JWT_SECRET);
      return res.status(httpStatus.OK).send(token);
    }

    return res.status(httpStatus.UNAUTHORIZED).send("Invalid email or password!");

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}