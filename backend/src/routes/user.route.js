
import { signup, update, form } from "../controllers/user.controller.js";

import { Router } from "express";


const router = Router();


router.post("/signup", signup);
router.post("/update",update)
router.post("/form",form)


router.post
export default router;
