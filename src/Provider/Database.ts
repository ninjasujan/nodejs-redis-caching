import mongoose from "mongoose";
import Locals from "./Locals";

export class Database {
	/**
	 * Initializing the database
	 */
	public static init(): any {
		mongoose.set("useNewUrlParser", true);
		mongoose.set("useUnifiedTopology", true);

		mongoose.connect(Locals.config().mongoUri, {
			keepAlive: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		mongoose.connection.on("connected", async () => {
			/* eslint-disable-next-line no-console */
			console.log("\x1b[33m%s\x1b[0m", `[Mongoose connection success]`);
		});

		mongoose.connection.on("error", () => {
			throw new Error(`[Mongoose connection] error`);
		});
	}
}

export default mongoose;
