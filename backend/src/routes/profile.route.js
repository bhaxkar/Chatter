import { Router } from "express"
import { updateAvatarImage, updateAccountDetails, changeCurrentPassword } from "../controllers/profile.controller.js"
import { authenticateJWT } from "../middlewares/auth.middleware.js" 

const router = Router();

router.put("/update-avatar", authenticateJWT, updateAvatarImage);
router.put("/update-account", authenticateJWT, updateAccountDetails);
router.post("/change-password", authenticateJWT, changeCurrentPassword);

export default router;