import { Router } from "express";
import { getEmployeesCount } from "../controllers/EmployeesCountController.js"; // Ensure the correct path and extension

const router = Router();

router.post('/', getEmployeesCount);

export default router;
