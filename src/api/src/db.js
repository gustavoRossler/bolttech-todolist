import pg from "pg";

export const pool = new pg.Pool({
  user: process.env.DB_USERNAME ?? "admin",
  database: process.env.DB_DATABASE ?? "bolttech",
  password: process.env.DB_PASSWORD ?? "RkPmg2y2",
  port: process.env.DB_PORT ?? 5432,
  host: process.env.DB_PASSWORD ?? "bolttech_db",
});
