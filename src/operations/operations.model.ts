import {
  Column,
  DataType,
  Model,
  Table,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { Locations } from 'src/locations/locations.model';

@Table({
  tableName: 'operations',
})
export class Operations extends Model<Model> {
  @Column({ type: DataType.DATE })
  date: Date;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  name: string;

  @ForeignKey(() => Locations)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  locationId: number;

  @BelongsTo(() => Locations)
  location: Locations;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  quantity: number;

  @AllowNull(false)
  @Column({ type: DataType.DECIMAL })
  amount: number;
}
