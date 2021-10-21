import mongoose from "mongoose";

export interface IEmployee {
	employeeId: string;
	name: string;
	dob: Date;
	designation: string;
	location: string;
	bloodGroup: string;
}

export interface Employee extends mongoose.Document, IEmployee {}

const employeeSchema = new mongoose.Schema({
	employeeId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	dob: {
		type: String,
		required: true,
	},
	designation: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	bloodGroup: {
		type: String,
		required: true,
	},
});

export default mongoose.model<Employee>("employee", employeeSchema);
