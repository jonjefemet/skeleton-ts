import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../utils/errors/CustomError";
import HttpStatusCode from "../utils/enums/httpStatusCode";

export enum VALIDATOR_TYPE {
    BODY = "BODY",
    PATH = "PATH",
    QUERY = "QUERY",
}

export interface IValidatorMiddleware {
    schema: Joi.ObjectSchema<any> | Joi.ArraySchema | Joi.StringSchema | Joi.NumberSchema;
    type: VALIDATOR_TYPE;
    pathParam?: string;
}

export function schemaValidator(validate: IValidatorMiddleware) {


    return function (req: Request, res: Response, next: NextFunction) {

        if (VALIDATOR_TYPE.BODY === validate.type) {
            const { error } = validate.schema.validate(req.body);
            if (error) {
                throw new CustomError(error.details[0].message, HttpStatusCode.BAD_REQUEST);
            }
        }

        if (VALIDATOR_TYPE.PATH === validate.type) {
            const { error } = validate.schema.validate(req.path);
            if (error) {
                throw new CustomError(error.details[0].message, HttpStatusCode.BAD_REQUEST);
            }
        }

        if (VALIDATOR_TYPE.QUERY === validate.type) {
            const { error } = validate.schema.validate(req.query);
            if (error) {
                throw new CustomError(error.details[0].message, HttpStatusCode.BAD_REQUEST);
            }
        }


        next();
    }
}