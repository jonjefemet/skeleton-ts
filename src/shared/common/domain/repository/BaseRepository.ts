import { inject, injectable } from "inversify";
import { EntityTarget, ObjectType, Repository } from "typeorm";
import TYPES from "../../../../utils/TYPES";
import DBConnectionManager from "../../../db/interfaces/DBConnectionManager";

@injectable()
export default class BaseRepository<T> {

  constructor( @inject( TYPES.ConnectionManagerPostgreSql ) private connectionManagerPostgreSql: DBConnectionManager ) {
  }

  private entity: ObjectType<T>;

  async create( entity: T ): Promise<T> {
    
    const connection = await this.connectionManagerPostgreSql.getActiveConnection();
    const queryBuilder = connection.manager
      .getRepository( this.entity );

    return await queryBuilder.save( entity );
  }

  async findById( id: number ): Promise<T | undefined> {
    const connection = await this.connectionManagerPostgreSql.getActiveConnection();
    const queryBuilder = connection.manager
      .getRepository( this.entity );

    return await queryBuilder.findOne( id );
  }

  async update( id: number, entity: Partial<T> ): Promise<T | undefined> {
    const existingEntity = await this.repository.findOne( id );

    if ( !existingEntity ) {
      return undefined;
    }

    const updatedEntity = Object.assign( existingEntity, entity );

    return await this.repository.save( updatedEntity );
  }

}
