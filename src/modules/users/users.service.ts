import { errorMessages } from '../../common/constants/error-messages';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDTO } from './dto/user.dto';
import { User } from './models/user.model';
import { Profile } from './models/profile.model';
import { UpdateProps, UserRole } from './types/user.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly usersRepository: typeof User,
    @InjectModel(Profile) private readonly profilesRepository: typeof Profile,
  ) {}

  // Find User By ID

  private async findUserById(id: number): Promise<Profile> {
    return await this.profilesRepository.findOne({
      include: {
        model: User,
        where: { id },
      },
    });
  }

  // Create User

  async createUserService(createDTO: CreateUserDTO): Promise<Profile> {
    try {
      // Destructuring the values ​​from createDTO
      const { firstName, lastName, state, email, username, role } = createDTO;

      // Search user by email
      const findUserByEmail = await this.usersRepository.findOne({
        where: { email },
      });

      // If user exist throw error 409 Conflict, with custom message
      if (findUserByEmail)
        throw new ConflictException(errorMessages.USER_EXIST_EMAIL);

      // If User doesn't exist, we create user

      // Create a profile with the desired values
      const createProfile = await this.profilesRepository.create({
        firstName,
        lastName,
        state,
      });

      // Create a user with the desired values
      await this.usersRepository.create({
        email,
        username,
        role,
        profileId: createProfile.id,
      });

      // Get additional user values
      const createdUser = await this.findUserById(createProfile.id);

      // Return addition info after update
      return createdUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  // Update User

  async updateUserService({ id, updateDTO }: UpdateProps): Promise<Profile> {
    try {
      // Destructuring the values ​​from updateDTO
      const { firstName, lastName, state, email, username, role } = updateDTO;

      const findUser = await this.findUserById(Number(id));
      if (!findUser) throw new NotFoundException(errorMessages.USER_EXIST_ID);

      // Update profile data
      await this.profilesRepository.update(
        { firstName, lastName, state },
        { where: { id } },
      );

      // Update user data
      await this.usersRepository.update(
        { email, username, role },
        { where: { id } },
      );

      // Return addition info after update
      return await this.findUserById(Number(id));
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // Get All Users

  async getAllUsersService(): Promise<Profile[]> {
    try {
      const usersToFind = await this.profilesRepository.findAll({
        include: {
          model: User,
        },
      });
      return usersToFind;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // Get Users By Role

  async getUsersByRole(role: UserRole): Promise<Profile[]> {
    try {
      const usersByRole = await this.profilesRepository.findAll({
        include: {
          model: User,
          where: { role },
        },
      });

      return usersByRole;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // Delete User

  async deleteUserService(id: string): Promise<void> {
    try {
      const findUserById = await this.findUserById(Number(id));
      if (!findUserById)
        throw new NotFoundException(errorMessages.USER_EXIST_ID);
      await this.profilesRepository.destroy({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
