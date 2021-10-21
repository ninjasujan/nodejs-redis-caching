import express, { Router } from "express";
import apiController from "../controller/api.controller";

const router: Router = express.Router();

router.get("/employee-list", apiController.getEmployeeList);

router.post("/add-employees", apiController.addEmployees);

export default router;
