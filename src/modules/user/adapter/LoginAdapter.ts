import { inject, injectable } from "inversify";
import Adapter from "../../../shared/common/adapter/interfaces/Adapter";
import { LoginData, LoginToken } from "../domain/dto/loginDTO";
import UseCase from "../../../shared/common/application/interfaces/UseCase";
import TYPES from "../../../utils/TYPES";

@injectable()
export default class LoginAdapter implements Adapter<LoginData, LoginToken> {

    constructor(
        @inject(TYPES.LoginUseCase) private loginUseCase: UseCase<LoginData, LoginToken>
    ) { }

    async excute(port: LoginData): Promise<LoginToken> {
        return this.loginUseCase.excute(port);
    }

}