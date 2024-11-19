import { config } from "dotenv";
config(); // Load environment variables from .env

import express from "express";
import pkg from "duckdb";
import CORS from "cors";

const { Database } = pkg;
const allowedOrigins = process.env.FRONTEND_URL.split(',');

const app = express();
const PORT = 4020;

app.use(
    CORS({
        origin: allowedOrigins,
        credentials: true,
    })
);

// JSON Middleware
app.use(express.json());

import routes from './routes/index.js'

// // Routes
// import departmentsRoutes from './routes/RankingOfDepartmentRoutes.js';
// import studentsRoutes from './routes/TotalStudentsRoutes.js';
// import employeesPerDepartmentRoutes from './routes/EmployeesPerDepartmentRoutes.js';
// import employeesCountRoutes from './routes/EmployeesCountRoute.js';
// import studentsPerDepartmentRoutes from "./routes/StudentsPerDepartmentRoute.js";

// app.use("/departments", departmentsRoutes);
// app.use("/students", studentsRoutes);
// app.use("/employees-per-department", employeesPerDepartmentRoutes);
// app.use("/students-per-department", studentsPerDepartmentRoutes);
// app.use("/employees-count", employeesCountRoutes);

app.use(routes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
