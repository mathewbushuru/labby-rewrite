import mysql from "mysql2";

const dbConnectionPool = mysql
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

export async function logMySQLVersion() {
  const connection = await dbConnectionPool.getConnection();
  try {
    const [rows] = await connection.query("SELECT VERSION()");
    console.log(rows);
  } finally {
    connection.release();
  }
}

export default dbConnectionPool;
