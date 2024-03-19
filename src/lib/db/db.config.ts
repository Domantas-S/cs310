
const prodBackendURL = "149.86.0.97"; 

export const config = import.meta.env.DEV ? {
    host: "localhost",
    port: 5444,
    database: 'phee',
    user: 'postgres',
    password: 'postgres'
  } : {
    host: prodBackendURL,
    port: 5444,
    database: 'phee',
    user: 'postgres',
    password: 'postgres'
  }