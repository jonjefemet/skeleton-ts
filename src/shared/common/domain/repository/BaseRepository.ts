import { injectable, unmanaged } from "inversify";
import { EntityNotFoundError, ObjectLiteral, ObjectType } from "typeorm";
import DBConnectionManager from "../../../db/interfaces/DBConnectionManager";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { CustomError } from "../../../../utils/errors/CustomError";
import HttpStatusCode from "../../../../utils/enums/httpStatusCode";

@injectable()
export default class BaseRepository<T> {

  constructor( 
    @unmanaged() protected connectionManagerPostgreSql: DBConnectionManager, 
    @unmanaged() private typeEntity: ObjectType<T>
  ) {
  }

  async update( id: string, entity: T ): Promise<T> {    
    const connection = await this.connectionManagerPostgreSql.getActiveConnection();
    const queryBuilder = connection.manager.getRepository( this.typeEntity );

    const result = await queryBuilder.update( id, entity as QueryDeepPartialEntity<T> );
    
    if ( result.affected === 0 ) throw new CustomError( "NOT_FOUND", HttpStatusCode.NOT_FOUND );

    return await this.findByIdOrFail( id );
  }
  
  async create( entity: Partial<T> ): Promise<T> {    
    const connection = await this.connectionManagerPostgreSql.getActiveConnection();
    const queryBuilder = connection.manager.createQueryBuilder()
      .insert().into( this.typeEntity ).values( entity as QueryDeepPartialEntity<T> );

    const item = await queryBuilder.execute();

    return item.generatedMaps as T;
  }
  
  async findOneById( id: string ): Promise<T | undefined> {
    const connection = await this.connectionManagerPostgreSql.getActiveConnection();
    const queryBuilder = connection.manager
      .getRepository( this.typeEntity )
      .createQueryBuilder( "T" )
      .where( "t.id = :id", {
        id
      });
  
    return await queryBuilder.getOne();
  }

  async findByIdOrFail( id: string ): Promise<T> {
    try {
      const connection = await this.connectionManagerPostgreSql.getActiveConnection();
      const queryBuilder = connection.manager
        .getRepository( this.typeEntity )
        .createQueryBuilder( "T" )
        .where( "t.id = :id", {
          id
        });
  
      return await queryBuilder.getOneOrFail();
    } catch ( error ) {
      if ( error instanceof EntityNotFoundError ) throw new CustomError( "NOT_FOUND", HttpStatusCode.NOT_FOUND );

      throw error;
    }
  }

  async findMany( filter: string | ObjectLiteral, parameters?: ObjectLiteral ): Promise<T[]> {
    const connection = await this.connectionManagerPostgreSql.getActiveConnection();
    const queryBuilder = connection.manager
      .getRepository( this.typeEntity )
      .createQueryBuilder( "T" )
      .where( filter, parameters );

    return await queryBuilder.getMany();
  }

  async findOne( filter: string | ObjectLiteral, parameters?: ObjectLiteral ): Promise<T[]> {
    const connection = await this.connectionManagerPostgreSql.getActiveConnection();
    const queryBuilder = connection.manager
      .getRepository( this.typeEntity )
      .createQueryBuilder( "T" )
      .where( filter, parameters );

    return await queryBuilder.getMany();
  }

}
