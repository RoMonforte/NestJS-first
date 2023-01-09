import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

const API_KEY = '123.45';
const API_KEY_PROD = 'prod xyz';

const client = new Client({
  user: 'RmC',
  host: 'localhost',
  database: 'postgres',
  password: 'admin123',
  port: 5432
})

client.connect();

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useValue: client,
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
