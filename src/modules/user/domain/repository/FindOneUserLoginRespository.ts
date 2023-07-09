import { SelectQueryBuilder } from "typeorm";
import FindOneBaseRepository from "../../../../shared/common/domain/repository/FindOneBaseRepository";
import User from "../entity/User";
import { inject, injectable } from "inversify";
import TYPES from "../../../../utils/TYPES";
import DBConnectionManager from "../../../../shared/db/interfaces/DBConnectionManager";

@injectable()
export default class FindOneUserLoginRespository extends FindOneBaseRepository<string, User> {

  constructor( @inject( TYPES.ConnectionManagerPostgreSql ) private connectionManager: DBConnectionManager ) {
    super();
  }

  protected async buildQuery( username: string ): Promise<SelectQueryBuilder<User>> {
    const connection = await this.connectionManager.getActiveConnection();
    const queryBuilder = connection.manager
      .getRepository( User )
      .createQueryBuilder( "User" )
      .where({
        username,
        active: true
      }); 

    return queryBuilder;
  }
    
}