import { UpdateUserDTO } from '../dto/user.dto';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum UserState {
  MALE = 'male',
  FEMALE = 'female',
}

export type UpdateProps = {
  id: string;
  updateDTO: UpdateUserDTO;
};
