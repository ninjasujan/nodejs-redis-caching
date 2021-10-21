import express, { Request, Response, NextFunction, Router } from "express";

const router: Router = express.Router();

import apiRoute from "./api.route";

router.get("/health", (req: Request, res: Response, next: NextFunction) => {
	res.status(200).send("OK");
});

router.use("/employee", apiRoute);

export default router;
