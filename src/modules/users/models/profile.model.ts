import { Table, Model, Column, DataType, HasOne } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserState } from '../types/user.types';
import { User } from './user.model';

// PROFILE TABLE
@Table
export class Profile extends Model<Profile> {
  @ApiProperty({ example: 1, description: 'Identifier' }) // <-- For Swagger
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  }) // <-- Table Column with properties
  id: number; // <-- Property

  // USER FIRST NAME
  @ApiProperty({ example: 'John', description: 'User First Name' }) // <-- For Swagger
  @Column({
    type: DataType.STRING,
    allowNull: false,
  }) // <-- Table Column with properties
  firstName: string; // <-- Property

  // USER LAST NAME
  @ApiProperty({ example: 'Smeet', description: 'User Last Name' }) // <-- For Swagger
  @Column({
    type: DataType.STRING,
    allowNull: false,
  }) // <-- Table Column with properties
  lastName: string; // <-- Property

  // USER STATE
  @ApiProperty({ example: 'male', description: 'User State', enum: UserState }) // <-- For Swagger
  @Column({
    type: DataType.ENUM,
    values: ['male', 'female'],
    allowNull: false,
  }) // <-- Table Column with properties
  state: UserState; // <-- Property

  // ONE-TO-ONE RELATIONS PARENT
  @HasOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @ApiProperty({
    type: () => User,
    description: 'User info',
  }) // <-- For Swagger
  user: User;

  // CREATED AT
  @ApiProperty({
    example: '2023-03-22T11:58:06.166Z',
    description: 'Created At',
  }) // <-- For Swagger
  @Column({ type: DataType.DATE, allowNull: false }) // <-- Table Column with properties
  createdAt: Date; // <-- Property

  // UPDATED AT
  @ApiProperty({
    example: '2023-03-22T11:59:07.166Z',
    description: 'Updated At',
  }) // <-- For Swagger
  @Column({ type: DataType.DATE, allowNull: false }) // <-- Table Column with properties
  updatedAt: Date; // <-- Property
}
