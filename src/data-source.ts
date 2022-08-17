import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import config from "./config";

const { mysql } = config;

export const dataSource = new DataSource({
  type: "mysql",
  host: mysql.host,
  port: parseInt(mysql.port!),
  username: mysql.user,
  password: mysql.password,
  database: mysql.database,
  migrations: [__dirname + "/migrations/*.ts,.js}"],
  migrationsTableName: "migrations",
  entities: [__dirname + "/modules/**/*.entity{.ts,.js}"],
  logging: process.env.NODE_ENV === "production" ? false : true,
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
});
