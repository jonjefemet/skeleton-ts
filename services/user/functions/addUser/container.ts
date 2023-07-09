import "reflect-metadata";
import { Container } from "inversify";
import TYPES from "../../../../src/utils/TYPES";
import ConnectionManagerPostgreSql from "../../../../src/shared/db/ConnectionManagerPostgreSql";
import DBConnectionManager from "../../../../src/shared/db/interfaces/DBConnectionManager";
import AddUserAdapter from "../../../../src/modules/user/adapter/AddUserAdapter";
import Adapter from "../../../../src/shared/common/adapter/interfaces/Adapter";
import User from "../../../../src/modules/user/domain/entity/User";
import UserBaseRepository from "../../../../src/modules/user/domain/repository/UserBaseRepository";

const container = new Container();
container.bind<DBConnectionManager>( TYPES.ConnectionManagerPostgreSql ).to( ConnectionManagerPostgreSql ).inSingletonScope();
container.bind<Adapter<Partial<User>, User>>( TYPES.AddUserAdapter ).to( AddUserAdapter );
container.bind<UserBaseRepository>( TYPES.UserBaseRepository ).to( UserBaseRepository );
export default container;