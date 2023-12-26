
import postgres from 'postgres';
import { config } from './db.config';

const sql = postgres(config);

export default sql;