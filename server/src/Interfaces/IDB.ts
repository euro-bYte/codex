import { Pool } from 'mysql2/promise';

export interface IDB {
  dbPool: Pool;
}
