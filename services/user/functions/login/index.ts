import express, { NextFunction, Request, Response } from "express";
import Controller from "../../Controller";
import { VALIDATOR_TYPE, schemaValidator } from "../../../../src/middleware/schemaValidator";
import { Schema } from "./schema";
import HttpStatusCode from "../../../../src/utils/enums/httpStatusCode";
import { CustomError } from "../../../../src/utils/errors/CustomError";

const loginRouter = express.Router();

loginRouter.post(
  "/login",
  schemaValidator({ schema: Schema, type: VALIDATOR_TYPE.BODY }),
  async( req: Request, res: Response, next: NextFunction ) => {

    try {
      const controller = new Controller();
      const result = await controller.login({ username: req.body.username, password: req.body.password });
      res.status( HttpStatusCode.OK ).send( result );
    } catch ( error ) {
      next( error );
    }
  }
);

export { loginRouter };