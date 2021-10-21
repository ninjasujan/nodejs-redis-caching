import express, { Application } from "express";
import http, { Server } from "http";
import Locals from "./Locals";
import httpMiddleware from "../middleware/http.middleware";
import ExceptionHandler from "../exceptions/handler";

import route from "../routes/index";

class Express {
	/**
	 * Create express object
	 */
	public express: Application;

	public server: Server;

	/**
	 * Initialize the express server
	 */
	constructor() {
		this.express = express();
		this.mountMiddlewware();
		this.mountRoute();
		this.server = http.createServer(this.express);
	}

	private mountMiddlewware(): void {
		httpMiddleware.mount(this.express);
	}

	public mountRoute(): void {
		this.express.use("/api", route);
		this.express.use(ExceptionHandler.errorHandler);
	}

	public getExpress(): Server {
		return this.server;
	}

	public init(): void {
		const { serverPort } = Locals.config();
		this.server.listen(serverPort, () => {
			/* eslint-disable-next-line no-console */
			console.log(
				"\x1b[33m%s\x1b[0m",
				`[Server running on port ${serverPort}]`
			);
		});
	}
}

export default new Express();
