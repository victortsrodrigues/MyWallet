import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { userSingInSchema, userSingUpSchema } from "../schemas/userSchema.js";
import { signIn, signUp } from "../controllers/userController.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(userSingUpSchema), signUp);
authRouter.post("/sign-in", validateSchema(userSingInSchema), signIn);

export default authRouter;