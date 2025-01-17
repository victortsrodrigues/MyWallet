import express, { json } from "express"
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import dotenv from "dotenv";
import transactionsRouter from "./routers/transactionsRouter.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use("/auth", authRouter);
app.use("/transactions", transactionsRouter);

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});