import pkg from "duckdb";
import express from "express";

const app = express();
app.use(express.json());
import studentsPerDepartmentRoutes from './StudentsPerDepartmentRoute.js';
import rankingOfDepartments from "./RankingOfDepartmentRoutes.js";
import totalStudentsRoutes from "./TotalStudentsRoutes.js";

app.use("/departments", rankingOfDepartments);
app.use("/students-per-department", studentsPerDepartmentRoutes);
app.use("/students", totalStudentsRoutes);

export default app;