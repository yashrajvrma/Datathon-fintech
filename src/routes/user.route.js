import { Router } from "express";
import { userSignin } from "../controllers/userSignin.controller.js";

const router = Router();

router.route("/signin").post(userSignin);

export default router;
