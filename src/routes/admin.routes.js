import { Router } from "express";
import { adminLogin,adminLogout } from "#controllers/admin.controller.js";
import { verifyAccessToken } from "#middlewares/auth.middleware.js";

const router = Router();

router.route(`/login`).post(adminLogin);

//secured route for logout admin
router.route(`/logout`).post(verifyAccessToken,adminLogout);

export default router;
