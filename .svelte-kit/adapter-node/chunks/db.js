import postgres from "postgres";
const config = {
  host: "host.docker.internal",
  port: 5444,
  database: "phee",
  user: "postgres",
  password: "postgres"
};
const sql = postgres(config);
export {
  sql as s
};
