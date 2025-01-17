import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { userSingupSchema } from "../schemas/userSchema.js";
import { signUp } from "../controllers/userController.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(userSingupSchema), signUp);

export default authRouter;