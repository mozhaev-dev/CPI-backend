import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Operations } from './operations.model';

import { CreateOperationDto } from './dto/createOperation.dto';

@Injectable()
export class OperationsService {
  constructor(
    @InjectModel(Operations) private operationsModel: typeof Operations,
  ) {}

  async create(data: CreateOperationDto[]) {
    return this.operationsModel.bulkCreate(data);
  }

  async getAll() {
    return this.operationsModel.findAll();
  }

  async getOne(id: number) {
    return this.operationsModel.findOne({ where: { id } });
  }
}
