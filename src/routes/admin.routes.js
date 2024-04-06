import { Router } from "express";
import {
  adminLogin,
  adminLogout,
  getAdminInfo
} from "#controllers/admin.controller.js";
import { verifyAccessToken } from "#middlewares/auth.middleware.js";

const router = Router();

router.route(`/login`).post(adminLogin);

//secured route for logout admin
router.route(`/logout`).post(verifyAccessToken, adminLogout);

//secured route for getting admin info
router.route(`/info`).get(verifyAccessToken, getAdminInfo);

export default router;
