import { Router } from "express";
import { ROUTES } from "../../constants/routes";
import { loginController, registerController } from "./auth.controller";
import { loginSchema, registrationSchema } from "../../schemas/auth.schema";
import bodyValidation from "../../middlewares/body-validation";

const authRoutes = Router();

authRoutes.post(
  ROUTES.REGISTER,
  registrationSchema,
  bodyValidation,
  registerController
);
authRoutes.post(ROUTES.LOGIN, loginSchema, bodyValidation, loginController);

export default authRoutes;
