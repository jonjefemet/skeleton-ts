import "reflect-metadata";
import { Container } from "inversify";
import Adapter from "../../../../src/shared/common/adapter/interfaces/Adapter";
import { LoginData, LoginToken } from "../../../../src/modules/user/domain/dto/loginDTO";
import LoginAdapter from "../../../../src/modules/user/adapter/LoginAdapter";
import UseCase from "../../../../src/shared/common/application/interfaces/UseCase";
import LoginUseCase from "../../../../src/modules/user/useCase/LoginUseCase";
import TYPES from "../../../../src/utils/TYPES";

const container = new Container();

container.bind<Adapter<LoginData, LoginToken>>( TYPES.LoginAdapter ).to( LoginAdapter );
container.bind<UseCase<LoginData, LoginToken>>( TYPES.LoginUseCase ).to( LoginUseCase );

export default container;