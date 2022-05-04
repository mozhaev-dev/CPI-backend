import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryTypes } from 'sequelize';
import { Locations } from './locations.model';

import { CreateLocationDto } from './dto/createLocation.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Locations) private locationsModel: typeof Locations,
  ) {}

  async createIfNotExists(locations: string[]) {
    const existLocations = (await this.getIDsByNames(locations)).map(
      (item) => item.name,
    );

    const notExistLocations = locations.filter(
      (item) => !existLocations.includes(item),
    );

    const createLocationsData: CreateLocationDto[] = notExistLocations.map(
      (item) => ({
        name: item,
      }),
    );

    await this.locationsModel.bulkCreate(createLocationsData);
  }

  async getIDsByNames(locations: string[]) {
    const result: { id: number; name: string }[] =
      await this.locationsModel.sequelize.query(
        'SELECT id, name FROM locations WHERE name IN(:locationNames)',
        {
          replacements: { locationNames: locations },
          type: QueryTypes.SELECT,
        },
      );

    return result;
  }

  // async getAll() {
  //   return this.operationsModel.findAll();
  // }

  // async getOne(id: number) {
  //   return this.operationsModel.findOne({ where: { id } });
  // }
}
