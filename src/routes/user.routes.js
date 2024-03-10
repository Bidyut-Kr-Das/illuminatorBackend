import { Router } from "express";
import { getUserInfo, createUser } from "#controllers/user.controller.js";

const router = Router();

router.route(`/:id`).get(getUserInfo);
router.route(`/signup`).post(createUser);

export default router;
