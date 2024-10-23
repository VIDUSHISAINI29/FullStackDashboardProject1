import { Router } from "express";
import {getStudentsPerDepartment} from "../controllers/StudentsPerDepartmentController.js"

const router = Router();

router.post('/', getStudentsPerDepartment);
 
export default router;