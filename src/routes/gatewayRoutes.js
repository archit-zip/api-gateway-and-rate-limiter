import express from "express";
import { proxyRequest } from "../controllers/proxyController.js";

const router = express.Router();

router.use("/", proxyRequest);

export default router;