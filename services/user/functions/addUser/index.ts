import express, { NextFunction, Request, Response } from "express";
import Controller from "../../Controller";
import { VALIDATOR_TYPE, schemaValidator } from "../../../../src/middleware/schemaValidator";
import { Schema } from "./schema";
import HttpStatusCode from "../../../../src/utils/enums/httpStatusCode";

const addUser = express.Router();

addUser.post(
  "/",
  schemaValidator({ schema: Schema, type: VALIDATOR_TYPE.BODY }),
  async( req: Request, res: Response, next: NextFunction ) => {

    try {
      const controller = new Controller();
      const result = await controller.addUser({ username: req.body.username, password: req.body.password });
      res.status( HttpStatusCode.OK ).send( result );
    } catch ( error ) {
      next( error );
    }
  }
);

export { addUser };