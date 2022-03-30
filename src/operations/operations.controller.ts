import { Body, Controller, Get, Post, Header } from '@nestjs/common';
import { CreateOperationDto } from './dto/createOperation.dto';
import { OperationsService } from './operations.service';

@Controller('operations')
export class OperationsController {
  constructor(private operationsService: OperationsService) {}

  @Post()
  @Header(
    'access-control-allow-headers',
    'origin, x-requested-with, content-type',
  )
  @Header('access-control-allow-methods', 'PUT, GET, POST, DELETE, OPTIONS')
  create(@Body() data: CreateOperationDto[]) {
    try {
      return this.operationsService.create(data);
    } catch (e) {
      console.log(e);
    }
  }

  @Get()
  @Header(
    'access-control-allow-headers',
    'origin, x-requested-with, content-type',
  )
  @Header('access-control-allow-methods', 'PUT, GET, POST, DELETE, OPTIONS')
  getAll() {
    return this.operationsService.getAll();
  }
}
