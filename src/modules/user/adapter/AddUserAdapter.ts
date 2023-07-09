import { inject, injectable } from "inversify";
import Adapter from "../../../shared/common/adapter/interfaces/Adapter";
import TYPES from "../../../utils/TYPES";
import User from "../domain/entity/User";
import BaseRepository from "../../../shared/common/domain/repository/BaseRepository";
import DBConnectionManager from "../../../shared/db/interfaces/DBConnectionManager";
import { hashPassword } from "../../../utils/hashPassword";

@injectable()
export default class AddUserAdapter implements Adapter<Partial<User>, User> {

  constructor(
  @inject( TYPES.UserBaseRepository ) private userBaseRepository: BaseRepository<User>,
  @inject( TYPES.ConnectionManagerPostgreSql ) private connectionManager: DBConnectionManager 
  ) { }

  async excute( port: User ): Promise<User> {
    await this.connectionManager.connect();
    try {
      port.password = hashPassword( port.password );

      return await this.userBaseRepository.create( port );
    } catch ( error ) {
      console.log( "💥 ~ file: AddUserAdapter.ts:23 ~ AddUserAdapter ~ excute ~ error\n:", error );
      throw error;
    } finally {
      await this.connectionManager.disconnect();
    }
  }

}