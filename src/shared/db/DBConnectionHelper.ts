import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

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
      entities: [],
      synchronize: false,
      type: "postgres"
    };

    return await new DataSource( dataSourceOptions ).initialize();
  }

}
