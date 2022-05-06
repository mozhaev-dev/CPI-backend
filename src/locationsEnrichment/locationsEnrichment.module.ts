import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LocationsEnrichmentTasks } from './locationsEnrichmentTasks.model';
import { LocationsEnrichmentService } from './locationsEnrichment.service';

@Module({
  providers: [LocationsEnrichmentService],
  imports: [SequelizeModule.forFeature([LocationsEnrichmentTasks])],
})
export class LocationsEnrichmentModule {}
