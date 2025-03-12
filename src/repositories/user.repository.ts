// Handles direct data operations related to users.
// This layer interacts with the database or a data source to perform CRUD operations.

import { ProjectionFields } from 'mongoose';
import { IUserModel, UserModel } from '../models/user.model';
import { BaseRepository } from './base.repository';
// import { IUserDto } from '../interfaces/userDto.interface';
import { IUser } from '../interfaces/user.interface';

export class UserRepository {
  private readonly baseRepository: BaseRepository<IUserModel>;
  private readonly registerProjection: ProjectionFields<Document>;

  constructor() {
    this.baseRepository = new BaseRepository(UserModel);
    this.registerProjection = { createdAt: 0, updatedAt: 0}
  }

  register = async (user: IUser) => await this.baseRepository.register(user);

  findByEmail = async (email: string) => await this.baseRepository.findByEmail(email);
}
