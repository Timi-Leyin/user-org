import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import { defaultMiddleware, errorMiddleware } from "./core/index.middleware";
import { corsOptions } from "./config/cors";

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use("/api", defaultMiddleware);
app.use(errorMiddleware);
export default app;
