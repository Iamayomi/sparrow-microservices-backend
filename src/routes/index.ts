import { Router } from "express";
import { controller } from "../controllers";
import { validateRequest } from "../middleware";
import * as _ from "../validation-schema";

// import authenticateRequest from "../middle/authenticateRequest";

const router = Router();

router.post("/register", validateRequest(_.registrationSchema), controller.register);

export default router;
