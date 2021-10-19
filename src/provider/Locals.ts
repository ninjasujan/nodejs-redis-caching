import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

class Locals {
	/**
	 * Make env available throughout your application runtime
	 */
	public static config(): any {
		const environment = process.env.ENVIRONMENT || "dev";
		const serverPort = process.env.SERVER_PORT || "";
		const redisPort = process.env.REDIS_PORT || "";
		const redisServer = process.env.REDIS_SERVER || "";

		return {
			environment,
			serverPort,
			redisPort,
			redisServer,
		};
	}
}

export default Locals;
