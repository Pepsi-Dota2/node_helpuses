import * as dotenv from "dotenv";

dotenv.config();
export default {
  DB_PORT: parseInt(process.env.DB_PORT || "3306"),
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_SCHEMA: process.env.DB_SCHEMA,
  BASE_PATH: `${process.env.BASE_PATH}`,
  JWT_PRIVATE: `${process.env.JWT_PRIVATE}`,
  JWT_PUBLIC: `${process.env.JWT_PUBLIC}`,
  ENCRYPTION_KEY: `${process.env.ENCRYPTION_KEY}`,
  PRISMA_DB_CONN: process.env.PRISMA_DB_CONN,
  NODE_PORT: parseInt(process.env.NODE_PORT ?? "8001"),
};
