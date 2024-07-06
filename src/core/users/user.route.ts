import { Router } from "express";
import { ROUTES } from "../../constants/routes";
import authGuard from "../../middlewares/auth-guard";
import { userByIdController } from "./users.controller";

const usersRoute = Router()


usersRoute.get(ROUTES.USER_ID, authGuard, userByIdController)


export default usersRoute