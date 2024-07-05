import app from "./app";
import logger from "./helpers/logger";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => logger(`Server is Live on PORT ${PORT} 😊😊`));
