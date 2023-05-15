import {
  Table, Column, Model, AllowNull, PrimaryKey, AutoIncrement,
} from 'sequelize-typescript';

@Table
export default class Post extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @AllowNull(false)
  @Column
    name: string;

  @AllowNull(false)
  @Column
    description: string;
}
