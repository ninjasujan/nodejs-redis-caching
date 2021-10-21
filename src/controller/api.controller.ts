import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import employeeModel from "../models/employee.model";
import APIError from "../exceptions/api.error";
import ValidationError from "../exceptions/validation.error";

class Api {
	public getEmployeeList = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const employees = await employeeModel.find({});
			if (!employees.length) {
				throw new APIError("No employee registered", 400);
			}
			res
				.status(200)
				.json({ status: "success", message: "Employee list", data: employees });
		} catch (error) {
			next(error);
		}
	};

	public addEmployees = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw new ValidationError(errors);
			}
			const { employees } = req.body;
			const savedEmployees = await employeeModel.insertMany(employees);
			res.status(200).json({
				status: "success",
				message: "Employee added successfully",
				data: savedEmployees,
			});
		} catch (error) {
			next(error);
		}
	};
}

export default new Api();
