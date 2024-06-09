import mysql from "mysql2";
import postgres from "postgres";

export const mysqlConnectionPool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_NAME,
    ssl: {
      rejectUnauthorized: process.env.environment !== "development",
    },
  })
  .promise();

async function logMySQLVersion() {
  const connection = await mysqlConnectionPool.getConnection();
  try {
    const [rows] = await connection.query("SELECT VERSION()");
    console.log("MySQL:", rows);
  } finally {
    connection.release();
  }
}

export const postgresConnectionPool = postgres({
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: 5432,
  ssl: process.env.PG_LOCALHOST === "true" ? undefined : "require",
  connection: {
    options:
      process.env.PG_LOCALHOST === "true"
        ? undefined
        : `project=${process.env.PG_ENDPOINT_ID}`,
  },
});

async function logPostgresVersion() {
  const result = await postgresConnectionPool`SELECT VERSION()`;
  console.log(result);
}

export const logDatabaseVersion =
  process.env.database === "mysql" ? logMySQLVersion : logPostgresVersion;
