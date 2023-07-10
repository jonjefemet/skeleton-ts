import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import entities from "./Entities";

export default class DBConnectionHelper {

  async connect( url: { [key: string]: string }): Promise<DataSource> {
    const { dbname, port, password, host, username } = url;

    const dataSourceOptions: PostgresConnectionOptions = {
      host,
      username,
      password,
      database: dbname,
      port: Number( port ),
      namingStrategy: new SnakeNamingStrategy(),
      entities: entities,
      synchronize: true,
      type: "postgres"
    };

    return await new DataSource( dataSourceOptions ).initialize();
  }

}
