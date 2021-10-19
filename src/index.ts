import * as path from "path";
import * as dotenv from "dotenv";
import App from "./provider/App";

dotenv.config({ path: path.join(__dirname, "../.env") });

/**
 * Connecting Database
 */

/**
 * Connecting server
 */
App.loadServer();
