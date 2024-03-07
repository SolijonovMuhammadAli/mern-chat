import { Router } from "express";
import { senMessage, getMessage } from "../controllers/message.controllers.js";
import protectRoute from "../middleware/protectRoute.js";

const router = Router();

router.get("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, senMessage);

export default router;
