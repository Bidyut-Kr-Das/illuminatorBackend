import { Router } from "express";
import { createProduct } from "../controllers/products.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route(`/`).post(upload.single(`productImage`), createProduct);

export default router;
