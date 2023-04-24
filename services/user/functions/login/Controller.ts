import { Request, Response } from "express";
import generateAccessToken from "../../../../src/utils/generateAccessToken";
import { Body, Post, Route, SuccessResponse } from "tsoa";
import HttpStatusCode from "../../../../src/utils/enums/httpStatusCode";

@Route("/api/user")
export default class Controller {

    async run(req: Request, res: Response) {
        const result = await this.adapter({username: req.body.username, password: req.body.password})
        res.status(HttpStatusCode.OK).send(result);
    }

    @Post("/login")
    @SuccessResponse(HttpStatusCode.OK)
    async adapter(@Body() args: { username: string, password: string }) {
        const token = generateAccessToken({ username: args.username });
        return { token: token };
    }

}

