import { ObjectType, QueryRunner, Repository } from "typeorm";

export interface IDatabaseService {
  initialize(): Promise<void>;
  getRepository(entity: ObjectType<any>): Promise<Repository<any>>;
  getTransaction(): Promise<QueryRunner>;
}
