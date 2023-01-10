import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config';

const API_KEY = '123.45';
const API_KEY_PROD = 'prod xyz';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbUser, host, dbPassword, dbName, port } =
          configService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: dbUser,
          password: dbPassword,
          database: dbName,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbUser, host, dbPassword, dbName, port } =
          configService.postgres;
        const client = new Client({
          user: dbUser,
          host: host,
          database: dbName,
          password: dbPassword,
          port: port,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
