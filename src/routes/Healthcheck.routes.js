import { Router } from "express";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
import { healthcheck } from "../controllers/healthCheck.controller.js";
const router = new Router();
router.route("/healthcheck").get(verifyJWT, healthcheck);
export default router;
