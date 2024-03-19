
const prodBackendURL = "https://annotate.db.drugwatch.net"; 

export const config = import.meta.env.DEV ? {
    host: "localhost",
    port: 5444,
    database: 'phee',
    user: 'postgres',
    password: 'postgres'
  } : {
    host: prodBackendURL,
    port: 80,
    database: 'phee',
    user: 'postgres',
    password: 'postgres'
  }