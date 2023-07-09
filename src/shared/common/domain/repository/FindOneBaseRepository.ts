import { injectable } from "inversify";
import { EntityNotFoundError, SelectQueryBuilder } from "typeorm";
import Repository from "./interfaces/Repository";
import { CustomError } from "../../../../utils/errors/CustomError";
import HttpStatusCode from "../../../../utils/enums/httpStatusCode";

@injectable()
export default abstract class FindOneBaseRepository<T, U> implements Repository<T, U> {

  protected abstract buildQuery( port?: T ): Promise<SelectQueryBuilder<U>>;

  async execute( port?: T ): Promise<U> {

    try {
      const query = await this.buildQuery( port ) as SelectQueryBuilder<U>;
      
      const result = await query.getOneOrFail();
    
      return result;        
    } catch ( error ) {
      console.log( "💥 ~ file: FindOneBaseRepository.ts:22 ~ FindOneBaseRepository<T, ~ execute ~ error\n:", error );

      if ( error instanceof EntityNotFoundError ) throw new CustomError( "NOT_FOUND", HttpStatusCode.NOT_FOUND );

      throw error;
    }

  }

}