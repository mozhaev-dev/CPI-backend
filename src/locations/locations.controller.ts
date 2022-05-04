import { Body, Controller, Get, Post, Header } from '@nestjs/common';
import { CreateLocationDto } from './dto/createLocation.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}
}
