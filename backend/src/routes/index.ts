import users from "./users-route";
import { Router } from "express";

const router = Router();

router.use("/users", users);

export default router;
