import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "prasanna",
  password: "root",
  database: "sws_project",
});

export default pool;