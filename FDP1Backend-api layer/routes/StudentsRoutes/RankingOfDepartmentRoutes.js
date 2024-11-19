import { Router } from "express";
import {getRankedDepartments} from "../../controllers/RankingOfDepartmentController.js";

const router = Router();

router.post('/', getRankedDepartments);

export default router;
