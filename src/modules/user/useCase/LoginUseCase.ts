import { injectable } from "inversify";
import UseCase from "../../../shared/common/application/interfaces/UseCase";
import generateAccessToken from "../../../utils/generateAccessToken";
import { LoginData, LoginToken } from "../domain/dto/loginDTO";

@injectable()
export default class LoginUseCase implements UseCase<LoginData, LoginToken> {

  async excute( port: LoginData ): Promise<LoginToken> {

    const token = generateAccessToken({ username: port.username });

    return {
      token: token
    };
  }

}