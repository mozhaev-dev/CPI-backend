import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LocationsController } from './locations.controller';
import { Locations } from './locations.model';
import { LocationsService } from './locations.service';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService],
  imports: [SequelizeModule.forFeature([Locations])],
})
export class LocationsModule {}
