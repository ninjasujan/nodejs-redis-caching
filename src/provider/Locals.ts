import { Application } from "express";

class Locals {
	/**
	 * Make env available throughout your application runtime
	 */
	public static config(): any {
		const environment = process.env.ENVIRONMENT || "dev";
		const port = process.env.PORT || 5000;

		return {
			environment,
			port,
		};
	}

	public static init(_express: Application): Application {
		return _express;
	}
}

export default Locals;
