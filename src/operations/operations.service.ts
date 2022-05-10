import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Operations } from './operations.model';
import { LocationsService } from 'src/locations/locations.service';

import { CreateOperationDto } from './dto/createOperation.dto';
import { Locations } from 'src/locations/locations.model';

@Injectable()
export class OperationsService {
  constructor(
    @InjectModel(Operations) private operationsModel: typeof Operations,
    private locationsService: LocationsService,
  ) {}

  async create(data: CreateOperationDto[]) {
    const locations: string[] = Array.from(
      data.reduce((acc, { location }) => {
        acc.add(location);
        return acc;
      }, new Set<string>()),
    );

    const transaction = await this.operationsModel.sequelize.transaction();

    try {
      await this.locationsService.createIfNotExists(locations);

      const existLocationsIDs = (
        await this.locationsService.getIDsByNames(locations)
      ).reduce((acc, item) => {
        acc[item.name] = item.id;
        return acc;
      }, {});

      const createOperationsData = data.map((item) => ({
        ...item,
        locationId: existLocationsIDs[item.location],
      }));

      await this.operationsModel.bulkCreate(createOperationsData);

      transaction.commit();
    } catch (e) {
      transaction.rollback();
      throw e;
    }
  }

  async getAll() {
    return this.operationsModel.findAll({ include: [{
     model: Locations
   }]});
  }

  async getOne(id: number) {
    return this.operationsModel.findOne({ where: { id } });
  }
}
