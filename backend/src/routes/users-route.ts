import { Router } from "express";
import { UserController } from "../controllers";
import { AuthMiddleware } from "../middlewares";

const router = Router();

router.post("/login", UserController.login);
router.post("/signup", UserController.signup);
router.get("/me", AuthMiddleware.verifyToken, UserController.me);


export default router;