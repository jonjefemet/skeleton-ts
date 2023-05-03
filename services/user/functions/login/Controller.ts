import { Request, Response } from "express";
import generateAccessToken from "../../../../src/utils/generateAccessToken";
import { Body, Post, Route, SuccessResponse } from "tsoa";
import HttpStatusCode from "../../../../src/utils/enums/httpStatusCode";

@Route("/api/user")
export default class Controller {

    @Post("/login")
    @SuccessResponse(HttpStatusCode.OK)
    async run(@Body() args: { username: string, password: string }) {
        const token = generateAccessToken({ username: args.username });
        return { token: token };
    }

}

