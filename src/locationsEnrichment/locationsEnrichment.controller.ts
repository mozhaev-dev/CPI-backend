import { Body, Controller, Get, Post, Header } from '@nestjs/common';
import { LocationsEnrichmentService } from './locationsEnrichment.service';

@Controller('locations-enrichment')
export class LocationsEnrichmentController {
  constructor(private locationsEnrichmentService: LocationsEnrichmentService) {}

  @Get('reset')
  @Header(
    'access-control-allow-headers',
    'origin, x-requested-with, content-type',
  )
  @Header('access-control-allow-methods', 'PUT, GET, POST, DELETE, OPTIONS')
  reset() {
    try {
      return this.locationsEnrichmentService.reset();
    } catch (e) {
      console.log(e);
    }
  }
}
