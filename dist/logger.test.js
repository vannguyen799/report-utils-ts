import { getLogger, setLogLevel } from "./index.js";
const logger = getLogger();
logger.info("This is an info message");
logger.success("This is a success message");
logger.warn("This is a warning message");
logger.error("This is an error message");
setLogLevel("debug");
logger.debug("This is a debug message");
