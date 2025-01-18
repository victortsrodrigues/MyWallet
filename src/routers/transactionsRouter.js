import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { transactionSchema } from "../schemas/transactionSchema.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { creatTransaction, readTransactions, updateTransactions } from "../controllers/transactionsController.js";

const transactionsRouter = Router();

transactionsRouter.use(validateToken);
transactionsRouter.post("/transaction", validateSchema(transactionSchema), creatTransaction);
transactionsRouter.get("/transaction", readTransactions);
transactionsRouter.put("/transaction/:id", validateSchema(transactionSchema), updateTransactions)

export default transactionsRouter;