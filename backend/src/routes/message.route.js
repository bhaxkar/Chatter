import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware.js"
import { getUserForSiderbar, getMessages, sendMessages } from "../controllers/message.controller.js"

const router = Router();

router.get("/users", authenticateJWT, getUserForSiderbar);
router.get("/:id", authenticateJWT, getMessages);
router.post("/send/:id", authenticateJWT, sendMessages);

export default router;