import app from "./app";
import dotenv from "dotenv"
dotenv.config()
import { ENV } from "./constants/env";
import logger from "./helpers/logger";

app.listen(ENV.PORT, () => logger(`Server is Live on PORT ${ENV.PORT} 😊😊`));
