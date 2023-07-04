import { Request, Response } from "express";
import generateAccessToken from "../../../../src/utils/generateAccessToken";
import { Body, Post, Route, SuccessResponse } from "tsoa";
import HttpStatusCode from "../../../../src/utils/enums/httpStatusCode";
import container from "./container";
import Adapter from "../../../../src/shared/common/adapter/interfaces/Adapter";
import { LoginData, LoginToken } from "../../../../src/modules/user/domain/dto/loginDTO";

@Route( "/api/user" )
export default class Controller {

    @Post( "/login" )
    @SuccessResponse( HttpStatusCode.OK )
  async run( @Body() args: { username: string; password: string }) {

    const adapter = container.get<Adapter<LoginData, LoginToken>>( "LoginAdapter" );

    return adapter.excute({
      username: args.username,
      password: args.password
    });
  }

}
