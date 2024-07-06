import { Router } from "express";
import { ROUTES } from "../../constants/routes";
import { registerController } from "./auth.controller";
import { registrationSchema } from "../../schemas/auth.schema";
import bodyValidation from "../../middlewares/body-validation";

const authRoutes = Router();

authRoutes.post(
  ROUTES.REGISTER,
  registrationSchema,
  bodyValidation,
  registerController
);

export default authRoutes;
