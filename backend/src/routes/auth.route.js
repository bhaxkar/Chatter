import { Router } from "express";
import {signup, login, logout, validateAuth, refreshAccessToken} from "../controllers/auth.controller.js"
import { authenticateJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", authenticateJWT, logout);
router.get("/validate-auth", authenticateJWT, validateAuth);
router.post("/refresh-token", refreshAccessToken);

export default router;