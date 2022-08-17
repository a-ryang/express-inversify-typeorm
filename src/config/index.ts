import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === "production"
      ? ".production.env"
      : ".development.env"
  ),
});

export default {
  port: process.env.PORT,
  mysql: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB,
  },
};
