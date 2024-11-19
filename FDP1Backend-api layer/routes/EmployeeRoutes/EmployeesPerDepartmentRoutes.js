import { Router } from "express";
import {getEmployeesPerDepartment} from "../../controllers/EmployeesPerDepartmentController.js"

const router = Router();

router.post('/', getEmployeesPerDepartment);
 
export default router;