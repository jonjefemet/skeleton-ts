import jwt from "jsonwebtoken";
import { CustomError } from "../utils/errors/CustomError";
import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../utils/enums/httpStatusCode";

type ErrorToken = { [key: string]: string };
export default function authenticateToken( req: Request, res: Response, next: NextFunction ) {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split( " " )[1];

  if ( token == null ) throw new CustomError( "Invalid token", HttpStatusCode.UNAUTHORIZED );

  jwt.verify( token, process.env.TOKEN_SECRET as string, ( err: any, user: any ) => {

    if ( err ) {
      if ( err.name === "TokenExpiredError" ) throw new CustomError( "Expired token", HttpStatusCode.FORBIDDEN );

      throw new CustomError( "Forbidden", HttpStatusCode.FORBIDDEN );
    }

    next();
  });
}