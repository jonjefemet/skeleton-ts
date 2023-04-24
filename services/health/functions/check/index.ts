import express from "express";

import Controller  from "./Controller";

const healthRouter = express.Router();

const healthController = new Controller();

healthRouter.get("/", healthController.run.bind(healthController));

export { healthRouter };