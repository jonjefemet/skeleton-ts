import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errors/CustomError";

/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
function handleError(
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err;

  if ( !( err instanceof CustomError )) {
    customError = new CustomError( "Oh no we are having troubles: " + err.message );
  }

  console.log( "💥 ~ file: handleError.ts:23 ~ customError\n:", customError );
  res.status(( customError as CustomError ).status ).send(( customError as CustomError ).format());

}

export default handleError;