import { inject, injectable } from "inversify";
import { DataSource, ObjectType, Repository } from "typeorm";
import { IDatabaseService } from "./interface/IDatabase.service";
import { TYPES } from "../../container/types";
import { Logger } from "../../utils/logger";
import { dataSource } from "../../data-source";

@injectable()
export class DatabaseService implements IDatabaseService {
  private static _dataSource: DataSource;

  constructor(@inject(TYPES.Logger) private readonly _log: Logger) {}

  public async initialize() {
    try {
      DatabaseService._dataSource = await dataSource
        .initialize()
        .then((dataSource) => {
          this._log.info("database initialize success");
          return dataSource;
        });
    } catch (err) {
      this._log.error(err, `database initialize error`);
    }
  }

  public async getRepository(
    entity: ObjectType<any>
  ): Promise<Repository<any>> {
    return DatabaseService._dataSource.getRepository(entity);
  }

  public async getTransaction() {
    return DatabaseService._dataSource.createQueryRunner();
  }
}
