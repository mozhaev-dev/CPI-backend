import {
  Column,
  DataType,
  Model,
  Table,
  AllowNull,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from 'sequelize-typescript';

import { Locations } from 'src/locations/locations.model';

@Table({
  tableName: 'locationsEnrichmentTasks',
})
export class LocationsEnrichmentTasks extends Model<Model> {
  @PrimaryKey
  @AllowNull(false)
  @Column({ type: DataType.STRING })
  id: string;

  @ForeignKey(() => Locations)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  locationId: number;

  @BelongsTo(() => Locations)
  location: Locations;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  status: number;
}
