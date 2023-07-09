import { Body, Post, Route, SuccessResponse } from "tsoa";
import HttpStatusCode from "../../src/utils/enums/httpStatusCode";
import containerLogin from "./functions/login/container";
import containerAddUser from "./functions/addUser/container";

import Adapter from "../../src/shared/common/adapter/interfaces/Adapter";
import { LoginData, LoginToken } from "../../src/modules/user/domain/dto/loginDTO";
import TYPES from "../../src/utils/TYPES";
import User from "../../src/modules/user/domain/entity/User";

@Route( "/api/user" )
export default class Controller {

  @Post( "/login" )
  @SuccessResponse( HttpStatusCode.OK )
  async login( @Body() args: { username: string; password: string }) {
    const adapter = containerLogin.get<Adapter<LoginData, LoginToken>>( TYPES.LoginAdapter );

    return adapter.excute({
      username: args.username,
      password: args.password
    });
  }

  @Post( "/" )
  @SuccessResponse( HttpStatusCode.OK )
  async addUser( @Body() args: { username: string; password: string }) {
    const adapter = containerAddUser.get<Adapter<Partial<User>, User>>( TYPES.AddUserAdapter );

    return await adapter.excute({
      username: args.username,
      password: args.password
    });

  }

}
