import express from "express";
import { healthRouter } from "./functions/check/index";

const app = express();

app.use("/api/health", healthRouter);

export default app; 