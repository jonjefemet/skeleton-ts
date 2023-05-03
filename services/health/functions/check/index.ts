import express, { Request, Response } from "express";
import HttpStatusCode from "../../../../src/utils/enums/httpStatusCode";

const healthRouter = express.Router();

healthRouter.get("/", async (req: Request, res: Response) => {

    res.status(HttpStatusCode.OK).send("OK");

});

export { healthRouter };