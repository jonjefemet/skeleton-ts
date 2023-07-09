import "reflect-metadata";
import { Container } from "inversify";
import Adapter from "../../../../src/shared/common/adapter/interfaces/Adapter";
import { LoginData, LoginToken } from "../../../../src/modules/user/domain/dto/loginDTO";
import LoginAdapter from "../../../../src/modules/user/adapter/LoginAdapter";
import UseCase from "../../../../src/shared/common/application/interfaces/UseCase";
import LoginUseCase from "../../../../src/modules/user/useCase/LoginUseCase";
import TYPES from "../../../../src/utils/TYPES";
import ConnectionManagerPostgreSql from "../../../../src/shared/db/ConnectionManagerPostgreSql";
import DBConnectionManager from "../../../../src/shared/db/interfaces/DBConnectionManager";
import User from "../../../../src/modules/user/domain/entity/User";
import Repository from "../../../../src/shared/common/domain/repository/interfaces/Repository";
import FindOneUserLoginRespository from "../../../../src/modules/user/domain/repository/FindOneUserLoginRespository";

const container = new Container();
container.bind<DBConnectionManager>( TYPES.ConnectionManagerPostgreSql ).to( ConnectionManagerPostgreSql ).inSingletonScope();
container.bind<Adapter<LoginData, LoginToken>>( TYPES.LoginAdapter ).to( LoginAdapter );
container.bind<UseCase<LoginData, LoginToken>>( TYPES.LoginUseCase ).to( LoginUseCase );
container.bind<Repository<string, User>>( TYPES.FindOneUserLoginRespository ).to( FindOneUserLoginRespository );

export default container;