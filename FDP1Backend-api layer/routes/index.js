
import express from "express"
const router = express.Router();

import employeesRouteIndex from './EmployeeRoutes/index.js'
import studetnsRouteIndex from './StudentsRoutes/index.js'

router.use('/', employeesRouteIndex)
router.use('/', studetnsRouteIndex)

export default router;