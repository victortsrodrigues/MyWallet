import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../config/database.js";
import { ObjectId } from "mongodb";
dotenv.config();

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  if (!token) return res.sendStatus(httpStatus.UNAUTHORIZED);

  try {
    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
      if (error) return res.sendStatus(httpStatus.UNAUTHORIZED)
      
      console.log(decoded);
      console.log(decoded.userId);
      const user = await db.collection("users").findOne({
        _id: new ObjectId(decoded.userId)
      });
      if(!user) return res.sendStatus(httpStatus.UNAUTHORIZED);

      res.locals.user = user;

      return next();
    })
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}