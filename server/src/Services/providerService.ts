import { Pool, RowDataPacket } from 'mysql2/promise';
import { IProvider } from '../Interfaces/IProvider';

// Retrieves a single insurance provider by its ID.
export async function getProviderById(dbPool: Pool, providerId: number): Promise<IProvider | null> {
  const [rows] = await dbPool.execute<RowDataPacket[]>('SELECT * FROM insurance_providers WHERE provider_id = ?', [providerId]);

  if (rows.length === 0) {
    return null;
  }

  // Cast the row to the IProvider interface
  const provider = rows[0] as IProvider;
  return provider;
}

// Retrieves all insurance providers from the database.
export async function getAllProviders(dbPool: Pool): Promise<IProvider[]> {
  const [rows] = await dbPool.execute<RowDataPacket[]>('SELECT * FROM insurance_providers');

  // Cast the rows to an array of IProvider interfaces
  const providers = rows as IProvider[];
  return providers;
}
