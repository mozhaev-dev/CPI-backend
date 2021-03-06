import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleModule } from '@nestjs/schedule';

import { Operations } from './operations/operations.model';
import { Locations } from './locations/locations.model';
import { LocationsEnrichmentTasks } from './locationsEnrichment/locationsEnrichmentTasks.model';

import { LocationsModule } from './locations/locations.module';
import { OperationsModule } from './operations/operations.module';
import { LocationsEnrichmentModule } from './locationsEnrichment/locationsEnrichment.module';

const envFilePath =
  process.env.NODE_ENV === 'development' ? '.development.env' : '.env';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({ envFilePath }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRESQL_DBHOST,
      port: Number(process.env.POSTGRESQL_DBPORT),
      username: process.env.POSTGRESQL_DBUSER,
      password: process.env.POSTGRESQL_DBPASSWORD,
      database: process.env.POSTGRESQL_DBNAME,
      models: [Locations, Operations, LocationsEnrichmentTasks],
      autoLoadModels: false,
      logging: false,
    }),
    ScheduleModule.forRoot(),
    OperationsModule,
    LocationsModule,
    LocationsEnrichmentModule,
  ],
})
export class AppModule {}
