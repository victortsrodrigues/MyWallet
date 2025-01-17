import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { transactionSchema } from "../schemas/transactionSchema.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { creatTransaction } from "../controllers/transactionsController.js";

const transactionsRouter = Router();

transactionsRouter.use(validateToken);
transactionsRouter.post("/transaction", validateSchema(transactionSchema), creatTransaction);

export default transactionsRouter;