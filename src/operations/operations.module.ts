import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LocationsService } from 'src/locations/locations.service';
import { OperationsController } from './operations.controller';
import { Operations } from './operations.model';
import { Locations } from 'src/locations/locations.model';
import { OperationsService } from './operations.service';

@Module({
  controllers: [OperationsController],
  providers: [OperationsService, LocationsService],
  imports: [SequelizeModule.forFeature([Operations, Locations])],
})
export class OperationsModule {}
