import { DataSource, QueryRunner } from "typeorm";
import DBConnectionManager from "./interfaces/DBConnectionManager";
import DBConnectionHelper from "./DBConnectionHelper";
import DBSetting from "../../config/DBSetting";
import { injectable } from "inversify";
import { CustomError } from "../../utils/errors/CustomError";
import HttpStatusCode from "../../utils/enums/httpStatusCode";

@injectable()
export default class ConnectionManagerPostgreSql implements DBConnectionManager {

  private queryRunner: QueryRunner;

  private connection: DataSource;

  async connect(): Promise<DataSource> {

    try {
      throw new CustomError( "INTERNAL_SERVER_ERROR", HttpStatusCode.INTERNAL_SERVER_ERROR );

      if ( !this.connection ) {
        this.connection = await new DBConnectionHelper().connect({
          dbname: DBSetting.credentialPostgreSql.dbname,
          host: DBSetting.credentialPostgreSql.host,
          password: DBSetting.credentialPostgreSql.password,
          port: DBSetting.credentialPostgreSql.port,
          username: DBSetting.credentialPostgreSql.username
        });

      } else if ( !this.connection.isInitialized ) {
        await this.connection.initialize();
      }

      return this.connection;

    } catch ( error ) {
      console.log( "🚀 ~ ConnectionManagerPostgreSql ~ connect ~ error:", error );
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.connection?.destroy();
    } catch ( error ) {
      console.log( "🚀 ~ ConnectionManagerPostgreSql ~ disconnect ~ error:", error );
      throw new CustomError( "INTERNAL_SERVER_ERROR", HttpStatusCode.INTERNAL_SERVER_ERROR );
    }
  }

  async endTransaction(): Promise<void> {
    try {
      await this.queryRunner?.release();
    } catch ( error ) {
      console.log( "🚀 ~ ConnectionManagerPostgreSql ~ endTransaction ~ error:", error );

      throw error;
    }
  }

  async getTransaction(): Promise<QueryRunner> {
    return this.queryRunner && !this.queryRunner.isReleased ? this.queryRunner : this.beginTransaction();
  }

  async getActiveConnection(): Promise<DataSource | QueryRunner> {
    return this.queryRunner && this.queryRunner.isTransactionActive ? this.getTransaction() : this.getConnection();
  }

  async getConnection(): Promise<DataSource> {
    return this.connection && this.connection.isInitialized ? this.connection : this.connect();
  }

  private async beginTransaction(): Promise<QueryRunner> {
    try {
      await this.connect();

      if ( !this.queryRunner || this.queryRunner.isReleased ) {
        this.queryRunner = this.connection.createQueryRunner();
        await this.queryRunner.startTransaction();
      }

      return this.queryRunner;
    } catch ( error ) {
      console.log( "🚀 ~ ConnectionManagerPostgreSql ~ beginTransaction ~ error:", error );

      throw new CustomError( "INTERNAL_SERVER_ERROR", HttpStatusCode.INTERNAL_SERVER_ERROR );
    }
  }

}