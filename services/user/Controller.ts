import generateAccessToken from "../../src/utils/generateAccessToken";
import { Body, Post, Route, SuccessResponse } from "tsoa";
import HttpStatusCode from "../../src/utils/enums/httpStatusCode";
import containerLogin from "./functions/login/container";
import Adapter from "../../src/shared/common/adapter/interfaces/Adapter";
import { LoginData, LoginToken } from "../../src/modules/user/domain/dto/loginDTO";
import TYPES from "../../src/utils/TYPES";

@Route( "/api/user" )
export default class Controller {

  @Post( "/login" )
  @SuccessResponse( HttpStatusCode.OK )
  async login( @Body() args: { username: string; password: string }) {
    try {
      const adapter = containerLogin.get<Adapter<LoginData, LoginToken>>( TYPES.LoginAdapter );

      return adapter.excute({
        username: args.username,
        password: args.password
      });
    } catch ( error ) {
      console.log( "🚀 ~ file: Controller.ts:23 ~ Controller ~ login ~ error:", error );

      return {};
    }

  }

  @Post( "/" )
  @SuccessResponse( HttpStatusCode.OK )
  async addUser( @Body() args: { username: string; password: string }) {
    return {};
  }

}
