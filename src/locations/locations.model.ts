import {
  Column,
  DataType,
  Model,
  Table,
  AllowNull,
  HasMany,
  HasOne,
} from 'sequelize-typescript';

import { Operations } from 'src/operations/operations.model';
import { LocationsEnrichmentTasks } from 'src/locationsEnrichment/locationsEnrichmentTasks.model';

@Table({
  tableName: 'locations',
  timestamps: false,
})
export class Locations extends Model<Model> {
  @Column({ type: DataType.STRING })
  placeId: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  name: string;

  @Column({ type: DataType.FLOAT })
  lat: number;

  @Column({ type: DataType.FLOAT })
  long: number;

  @Column({ type: DataType.JSONB })
  raw: string;

  @HasMany(() => Operations)
  operations: Operations;

  @HasOne(() => LocationsEnrichmentTasks)
  locationsEnrichmentTasks: LocationsEnrichmentTasks;
}
