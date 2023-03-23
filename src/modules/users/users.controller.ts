import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateUserDTO,
  GetByRoleQueryDTO,
  UpdateUserDTO,
} from './dto/user.dto';
import { Profile } from './models/profile.model';
import { UserRole } from './types/user.types';

import { UsersService } from './users.service';

@ApiTags('Users API')
@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Create User

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 201, type: Profile })
  @Post('create-user')
  async createUserController(
    @Body() createDTO: CreateUserDTO,
  ): Promise<Profile> {
    const createdUser = await this.userService.createUserService(createDTO);
    return createdUser;
  }

  // Update User

  @ApiOperation({ summary: 'UpdateUser' })
  @ApiResponse({ status: 200, type: Profile })
  @Patch('update-user/:id')
  async updateUserController(
    @Body() updateDTO: UpdateUserDTO,
    @Param('id') id: string,
  ): Promise<Profile> {
    const updatedUser = await this.userService.updateUserService({
      id,
      updateDTO,
    });
    return updatedUser;
  }

  // Get All Users

  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({ status: 200, type: [Profile] })
  @ApiResponse({
    status: 200,
    description: 'The list of all users with related user data',
    isArray: true,
    type: Profile,
  })
  @Get()
  async getAllUsersControlles(): Promise<Profile[]> {
    const users = await this.userService.getAllUsersService();
    return users;
  }

  // Get Users By Role

  @ApiOperation({ summary: 'Get Users By Role' })
  @ApiResponse({
    status: 200,
    description:
      'List of those who are already present, the role of those is indicated in the request',
  })
  @ApiQuery({ name: 'role', enum: UserRole })
  @Get('by-role')
  async getUsersByRole(@Query() query: GetByRoleQueryDTO) {
    const userByRole = await this.userService.getUsersByRole(query.role);
    return userByRole;
  }

  // Delete User

  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({
    status: 204,
    description: 'Successful deletion, return nothing --> No Content',
  })
  @HttpCode(204)
  @Delete('delete-user/:id')
  async deleteUserController(@Param('id') id: string) {
    await this.userService.deleteUserService(id);
  }
}
