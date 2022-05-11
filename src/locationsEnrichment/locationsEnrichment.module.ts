import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LocationsEnrichmentTasks } from './locationsEnrichmentTasks.model';
import { LocationsEnrichmentService } from './locationsEnrichment.service';
import { LocationsEnrichmentController } from './locationsEnrichment.controller';

@Module({
  controllers: [LocationsEnrichmentController],
  providers: [LocationsEnrichmentService],
  imports: [SequelizeModule.forFeature([LocationsEnrichmentTasks])],
})
export class LocationsEnrichmentModule {}
