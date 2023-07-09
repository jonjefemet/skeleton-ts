import { injectable } from "inversify";
import { SelectQueryBuilder } from "typeorm";
import Repository from "./interfaces/Repository";

@injectable()
export default abstract class FindBaseRepository<T, U> implements Repository<T, U[]> {

  protected abstract buildQuery( port?: T ): Promise<SelectQueryBuilder<U>>;

  public async execute( port?: T ): Promise<U[]> {
    const query = await this.buildQuery( port ) as SelectQueryBuilder<U>;
    const entities: U[] = await query.getMany();

    return entities;

  }

}