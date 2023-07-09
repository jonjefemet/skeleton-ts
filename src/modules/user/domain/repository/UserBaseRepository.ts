import { inject, injectable } from "inversify";
import BaseRepository from "../../../../shared/common/domain/repository/BaseRepository";
import User from "../entity/User";
import TYPES from "../../../../utils/TYPES";
import DBConnectionManager from "../../../../shared/db/interfaces/DBConnectionManager";

@injectable()
export default class UserBaseRepository extends BaseRepository<User> {

  constructor( @inject( TYPES.ConnectionManagerPostgreSql ) private connectionManager: DBConnectionManager ) {
    super( connectionManager, User );
  }

}