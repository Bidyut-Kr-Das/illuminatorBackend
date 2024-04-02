import { Router } from "express";
import {
  getUserInfo,
  createUser,
  loginUser,
  logoutUser
} from "#controllers/user.controller.js";
import { verifyAccessToken } from "#middlewares/auth.middleware.js";

const router = Router();

router.route(`/:id`).get(getUserInfo);
router.route(`/signup`).post(createUser);
router.route(`/login`).post(loginUser);

//secured route for the user
router.route(`/logout`).post(verifyAccessToken, logoutUser);

export default router;
