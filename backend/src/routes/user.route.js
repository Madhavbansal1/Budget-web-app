
import { signup, update, form } from "../controllers/user.controller.js";

import { Router } from "express";


const router = Router();


router.post("/signup", signup);
router.update("/update",update)
router.update("/form",form)


router.post
export default router;
