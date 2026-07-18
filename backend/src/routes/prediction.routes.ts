import { Router } from "express";
import { predictFraud } from "../controllers/prediction.controller";

const router = Router();

router.post("/", predictFraud);

export default router;