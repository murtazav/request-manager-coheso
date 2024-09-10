import users from "./users-route";
import dataRequest from "./data-request-route";
import { Router } from "express";

const router = Router();

router.use("/users", users);
router.use("/data-request", dataRequest);

export default router;
