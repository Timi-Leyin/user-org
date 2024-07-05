import express, { Router } from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import { defaultMiddleware, errorMiddleware } from "./core/index.middleware";
import { corsOptions } from "./config/cors";
import { ROUTES } from "./constants/routes";

app.use(cors(corsOptions));
app.use(morgan("dev"));


// ATTACH OTHER ROUTES TO APIROUTES
const apiRoutes = Router();



// DO NOT TOUCH >>>>>>>>
app.get(ROUTES.BASE, defaultMiddleware);
app.use(ROUTES.BASE, apiRoutes);
app.use(errorMiddleware);
export default app;
