import {Router} from "express";

import {getTotalStudents} from "../../controllers/TotalStudentsController.js";

const router = Router();

router.post('/', getTotalStudents);

export default router;