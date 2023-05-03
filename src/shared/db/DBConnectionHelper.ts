import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { DataSource } from "typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions"

export default class DBConnectionHelper {
	async connect(url: { [key: string]: any }): Promise<DataSource> {
		const { dbname, port, password, host, username } = url;
		const dataSourceOptions: MysqlConnectionOptions = {
			type: "mysql",
			host,
			username,
			password,
			database: dbname,
			port,
			namingStrategy: new SnakeNamingStrategy(),
			entities: [
			],
			logging: true,
			synchronize: true
		};
		return await new DataSource(dataSourceOptions).initialize();
	}
}
