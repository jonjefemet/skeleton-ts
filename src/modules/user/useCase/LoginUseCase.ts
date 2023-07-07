import { inject, injectable } from "inversify";
import UseCase from "../../../shared/common/application/interfaces/UseCase";
import generateAccessToken from "../../../utils/generateAccessToken";
import { LoginData, LoginToken } from "../domain/dto/loginDTO";
import TYPES from "../../../utils/TYPES";
import DBConnectionManager from "../../../shared/db/interfaces/DBConnectionManager";
import { CustomError } from "../../../utils/errors/CustomError";
import HttpStatusCode from "../../../utils/enums/httpStatusCode";

@injectable()
export default class LoginUseCase implements UseCase<LoginData, LoginToken> {

  constructor( @inject( TYPES.ConnectionManagerPostgreSql ) private connectionManagerPostgreSql: DBConnectionManager ) {}

  async excute( port: LoginData ): Promise<LoginToken> {

    await this.connectionManagerPostgreSql.connect();

    try {
      const token = generateAccessToken({ username: port.username });

      return {
        token: token
      };
      
    } catch ( error ) {
      console.log( "🚀 ~ file: LoginUseCase.ts:26 ~ LoginUseCase ~ excute ~ error:", error );
      throw new CustomError( "INTERNAL_SERVER_ERROR", HttpStatusCode.INTERNAL_SERVER_ERROR );

    } finally {
      await this.connectionManagerPostgreSql.disconnect();
    }
  }

}