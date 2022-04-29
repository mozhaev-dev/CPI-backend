import {
  Column,
  DataType,
  Model,
  Table,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  tableName: 'operations',
})
export class Operations extends Model<Model> {
  @Column({ type: DataType.DATE })
  date: Date;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  name: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  location: string;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  quantity: number;

  @AllowNull(false)
  @Column({ type: DataType.DECIMAL })
  amount: number;
}
