import mysql from "mysql";
import { config } from "dotenv";
config();

const configuration = {
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB,
  port: process.env.RDS_PORT,
};

export const oldConnectionPool = mysql.createPool(configuration);

const connectionPool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_NAME,
    ssl: {
      rejectUnauthorized: process.env.environment !== "development",
    },
  });

export default connectionPool;
