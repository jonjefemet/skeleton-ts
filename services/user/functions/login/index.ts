import express from "express";

import Controller from "./Controller";
import { VALIDATOR_TYPE, schemaValidator } from "../../../../src/middleware/schemaValidator";
import { Schema } from "./schema";

const loginRouter = express.Router();

const controller = new Controller();

loginRouter.post("/login",
    schemaValidator({ schema: Schema, type: VALIDATOR_TYPE.BODY }),
    controller.run.bind(controller)
);

export { loginRouter };