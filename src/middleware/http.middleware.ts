import cors from "cors";
import { Application } from "express";
import morgan from "morgan";
import express from "express";
import expressJwt from "express-jwt";
import Locals from "../Provider/Locals";

class Http {
	public static mount(_express: Application): Application {
		console.log("Booting the 'HTTP' middleware...");

		// Disable the x-powered-by header in response
		_express.disable("x-powered-by");

		// Enables the CORS
		_express.use(cors());

		// Enables the "gzip" / "deflate" compression for response

		_express.use(express.json());
		_express.use(express.urlencoded({ extended: true }));
		// _express.use(
		// 	expressJwt({
		// 		secret: Locals.config().appSecret,
		// 		algorithms: ["HS256"],
		// 	}).unless({
		// 		path: [{ url: "/api/user", methods: ["POST"] }],
		// 	})
		// );
		if (Locals.config().environment === "development") {
			_express.use(morgan("dev"));
		}
		return _express;
	}
}

export default Http;
