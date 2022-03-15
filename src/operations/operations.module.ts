import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OperationsController } from './operations.controller';
import { Operations } from './operations.model';
import { OperationsService } from './operations.service';

@Module({
  controllers: [OperationsController],
  providers: [OperationsService],
  imports: [SequelizeModule.forFeature([Operations])],
})
export class OperationsModule {}
