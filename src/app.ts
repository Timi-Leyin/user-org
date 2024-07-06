import express, { Router } from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import { defaultMiddleware, errorMiddleware } from "./core/index.middleware";
import { corsOptions } from "./config/cors";
import { ROUTES } from "./constants/routes";
import authRoutes from "./core/auth/auth.routes";
import usersRoute from "./core/users/user.route";
import orgRoutes from "./core/organisations/org.route";


app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors(corsOptions));
app.use(morgan("dev"));

// ATTACH OTHER ROUTES TO APIROUTES
const apiRoutes = Router();
apiRoutes.use(ROUTES.AUTH, authRoutes);
apiRoutes.use(ROUTES.USERS, usersRoute);
apiRoutes.use(ROUTES.ORGANISATIONS, orgRoutes);

// DO NOT TOUCH >>>>>>>>
app.get(ROUTES.BASE, defaultMiddleware);
app.use(ROUTES.BASE, apiRoutes);
app.use(errorMiddleware);
export default app;
