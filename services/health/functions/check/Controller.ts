import { Request, Response } from "express";
import HttpStatusCode from "../../../../src/utils/enums/httpStatusCode";

export default class Controller {

    async run(req: Request, res: Response) {
        res.status(HttpStatusCode.OK).send("OK");
    }
}