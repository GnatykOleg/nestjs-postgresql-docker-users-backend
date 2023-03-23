import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  Matches,
} from 'class-validator';

import { UserState, UserRole } from '../types/user.types';

// Create User DTO
export class CreateUserDTO {
  // User Name
  @ApiProperty({ example: 'john_7', description: 'User name' })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  // First Name
  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  // Last Name
  @ApiProperty({ example: 'Smeet', description: 'User last name' })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  // Email
  @ApiProperty({ example: 'john@mail.com', description: 'User email' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  // User State
  @ApiProperty({
    example: 'male',
    description: 'User state',
    enum: UserState,
  })
  @IsEnum(UserState)
  @IsNotEmpty()
  readonly state: UserState;

  // User Role
  @ApiProperty({
    example: 'admin',
    description: 'User role',
    enum: UserRole,
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  readonly role: UserRole;
}

//  Update User DTO
export class UpdateUserDTO {
  // User Name
  @ApiProperty({ example: 'john_7', description: 'User name' })
  @IsOptional()
  @IsString()
  readonly username: string;

  // First Name
  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsOptional()
  @IsString()
  readonly firstName: string;

  // Last Name
  @ApiProperty({ example: 'Smeet', description: 'User last name' })
  @IsOptional()
  @IsString()
  readonly lastName: string;

  // Email
  @ApiProperty({ example: 'john@mail.com', description: 'User email' })
  @IsOptional()
  @IsEmail()
  readonly email: string;

  // User State
  @ApiProperty({
    example: 'male',
    description: 'User state',
    enum: UserState,
  })
  @IsOptional()
  @IsEnum(UserState)
  @IsNotEmpty()
  readonly state: UserState;

  // User Role
  @ApiProperty({
    example: 'admin',
    description: 'User role',
    enum: UserRole,
  })
  @IsOptional()
  @IsEnum(UserRole)
  @IsNotEmpty()
  readonly role: UserRole;
}

export class GetByRoleQueryDTO {
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}

export class IdParam {
  @IsString()
  @Matches(/^[0-9]+$/, { message: 'id must contain only digits' })
  @IsNotEmpty()
  id: string;
}
