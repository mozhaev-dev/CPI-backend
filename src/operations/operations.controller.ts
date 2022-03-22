import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOperationDto } from './dto/createOperation.dto';
import { OperationsService } from './operations.service';

@Controller('operations')
export class OperationsController {
  constructor(private operationsService: OperationsService) {}

  @Post()
  create(@Body() data: CreateOperationDto[]) {
    try {
      return this.operationsService.create(data);
    } catch (e) {
      console.log(e);
    }
  }

  @Get()
  getAll() {
    return this.operationsService.getAll();
  }
}
