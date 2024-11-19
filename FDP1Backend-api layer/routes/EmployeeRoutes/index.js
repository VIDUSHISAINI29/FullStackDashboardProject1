import express from "express";
import pkg from "duckdb";

const app = express();
app.use(express.json());
import employeesCountRoutes from './EmployeesCountRoute.js';
import getEmployeesPerDepartment from "./EmployeesPerDepartmentRoutes.js";

app.use("/employees-count", employeesCountRoutes);
app.use("/employees-per-department", getEmployeesPerDepartment);

export default app;
