import { DataSource } from 'typeorm';
import { FavoriteGithubUser } from '../entities/FavoriteGithubUser';
import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config();

const requiredEnvs = ['DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_NAME'];
for (const env of requiredEnvs) {
  if (!process.env[env]) {
    throw new Error(`Environment variable ${env} is required`);
  }
}

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [FavoriteGithubUser],
  migrations: [],
  subscribers: [],
});

export const connectDB = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('MySQL Database Connected...');
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`Database: ${process.env.DB_NAME}`);
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
}; 