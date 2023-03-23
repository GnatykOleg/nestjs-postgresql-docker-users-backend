import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../types/user.types';
import { Profile } from './profile.model';

// USER TABLE
@Table({ timestamps: false })
export class User extends Model<User> {
  // Identifier
  @ApiProperty({ example: 1, description: 'Identifier' }) // <-- For Swagger
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  }) // <-- Table Column with properties
  id: number; // <-- Property

  // USERNAME
  @ApiProperty({ example: 'john_7', description: 'User name' }) // <-- For Swagger
  @Column({
    type: DataType.STRING,
    allowNull: false,
  }) // <-- Table Column with properties
  username: string; // <-- Property

  // EMAIL
  @ApiProperty({ example: 'john@mail.com', description: 'User email' }) // <-- For Swagger
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  }) // <-- Table Column with properties
  email: string; // <-- Property

  // USER ROLE
  @ApiProperty({
    description: 'User Role',
    enum: UserRole,
  }) // <-- For Swagger
  @Column({
    type: DataType.ENUM,
    values: ['admin', 'user'],
  }) // <-- Table Column with properties
  role: UserRole; // <-- Property

  // ONE-TO-ONE RELATIONS CHILD
  @ForeignKey(() => Profile)
  @ApiProperty() // <-- For Swagger
  profileId: number; // <-- Property
}
