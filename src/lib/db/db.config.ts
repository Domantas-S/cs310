
const prodBackendURL = "https://annotate.api.drugwatch.net"; 
const URL = import.meta.env.DEV ? "localhost" : prodBackendURL;

export const config = {
    host: URL,
    port: 5444,
    database: 'phee',
    user: 'postgres',
    password: 'postgres'
  };