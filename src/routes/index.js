import doctorRouter from "./doctorRouter.js";
import userRouter from "./userRouter.js";
import { Router } from "express";

const router = Router();

router.use("/users", userRouter);
router.use("/doctors", doctorRouter);

export default router;
