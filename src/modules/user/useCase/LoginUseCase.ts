import { inject, injectable } from "inversify";
import UseCase from "../../../shared/common/application/interfaces/UseCase";
import generateAccessToken from "../../../utils/generateAccessToken";
import { LoginData, LoginToken } from "../domain/dto/loginDTO";
import TYPES from "../../../utils/TYPES";
import DBConnectionManager from "../../../shared/db/interfaces/DBConnectionManager";
import { CustomError } from "../../../utils/errors/CustomError";
import HttpStatusCode from "../../../utils/enums/httpStatusCode";
import Repository from "../../../shared/common/domain/repository/interfaces/Repository";
import User from "../domain/entity/User";
import { verifyPassword } from "../../../utils/hashPassword";

@injectable()
export default class LoginUseCase implements UseCase<LoginData, LoginToken> {

  constructor(
  @inject( TYPES.ConnectionManagerPostgreSql ) private connectionManagerPostgreSql: DBConnectionManager,
  @inject( TYPES.FindOneUserLoginRespository ) private findOneUserLoginRespository: Repository<string, User> 
  ) {}
  
  async excute( port: LoginData ): Promise<LoginToken> {
    console.log( "💥 ~ file: LoginUseCase.ts:22 ~ LoginUseCase ~ excute ~ port\n:", port );
    await this.connectionManagerPostgreSql.connect();

    try {

      const { username, password } = await this.findOneUserLoginRespository.execute( port.username );

      if ( !verifyPassword( port.password, password )) {
        throw new CustomError( "UNAUTHORIZED", HttpStatusCode.UNAUTHORIZED );
      }

      const token = generateAccessToken({ username });

      return {
        token: token
      };
      
    } catch ( error ) {
      console.log( "🚀 ~ file: LoginUseCase.ts:26 ~ LoginUseCase ~ excute ~ error:", error );
      throw error;

    } finally {
      await this.connectionManagerPostgreSql.disconnect();
    }
  }

}