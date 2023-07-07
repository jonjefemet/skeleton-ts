import express, { Request, Response } from "express";
import Controller from "../../Controller";
import { VALIDATOR_TYPE, schemaValidator } from "../../../../src/middleware/schemaValidator";
import { Schema } from "./schema";
import HttpStatusCode from "../../../../src/utils/enums/httpStatusCode";

const loginRouter = express.Router();

loginRouter.post(
  "/login",
  schemaValidator({ schema: Schema, type: VALIDATOR_TYPE.BODY }),
  async( req: Request, res: Response ) => {

    const controller = new Controller();
    const result = await controller.login({ username: req.body.username, password: req.body.password }).catch( error => {
      console.log( "🚀 ~ file: index.ts:16 ~ result ~ error:", error );
       
    }).then(() => "" );
    res.status( HttpStatusCode.OK ).send( result );

  }
);

export { loginRouter };