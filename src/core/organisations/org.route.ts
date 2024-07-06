import { Router } from "express";
import { ROUTES } from "../../constants/routes";
import authGuard from "../../middlewares/auth-guard";
import { addUserToOrg, getAllOrg, getOrgById, newOrg } from "./org.controller";
import { addUserOrgSchema, newOrgSchema } from "../../schemas/org.schema";
import bodyValidation from "../../middlewares/body-validation";

const orgRoutes = Router();

orgRoutes.get(ROUTES.ORG, authGuard, getAllOrg);
orgRoutes.get(ROUTES.ORG_ID, authGuard, getOrgById);
orgRoutes.post(ROUTES.ORG, authGuard, newOrgSchema, bodyValidation, newOrg);
orgRoutes.post(ROUTES.ADD_USER_TO_ORG, authGuard, addUserOrgSchema, bodyValidation, addUserToOrg);

export default orgRoutes;
