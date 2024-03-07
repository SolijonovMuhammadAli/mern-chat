import { Router } from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUser } from "../controllers/user.controllers.js";

const router = Router();

router.get("/", protectRoute, getUser);

export default router;
