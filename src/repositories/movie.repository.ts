// Handles direct data operations related to users.
// This layer interacts with the database or a data source to perform CRUD operations.

import {MovieModel, IMovieModel, IRegisterModel } from '../models/movie.model';
import { IMovie } from '../types/movie.interface';
import { IRegister } from '../types/register.interface';
import { BaseRepository } from './base.repository';

export class MovieRepository {
  // private baseRepository: BaseRepository<IMovieModel>;
  private baseRepository: BaseRepository<IRegisterModel>;
  private defaultProjection: { [key: string]: 1 | 0};

  constructor() {
    this.baseRepository = new BaseRepository(MovieModel);
    this.defaultProjection = { id: 0, plot: 0, genres: 0, year: 0}; // 🔥 Se excluye __v correctamente
  }

  register = async (registerUser: IRegister) => await this.baseRepository.register(registerUser);

  findByEmail = async (email: string) => await this.baseRepository.findByEmail(email);

  getById = async (id: string) => {
    return await this.baseRepository.getById(id, this.defaultProjection);
  };

  find = (
    filters: Record<string, unknown> = {},
    pagination: { skip: number; limit: number } = { skip: 0, limit: 0 },
  ) => {
    const options = { ...pagination };
    return this.baseRepository.find<IMovieModel>(filters, this.defaultProjection, options);
  };
  create = async (movie: Partial<IMovie>) => {
    const filteredMovie: Partial<IMovie> = {
      title: movie.title ?? "Unknown Title",
      plot: movie.plot ?? "No plot available",
      genres: movie.genres ?? [],
      year: movie.year ?? new Date().getFullYear(),
      directors: movie.directors ?? [],
      released: movie.released ?? new Date(),
    };

    return await this.baseRepository.create(filteredMovie);
  };
  update = async (id: string, movie: Partial<IMovie>) => {
    return await this.baseRepository.update(id, movie);
  }
  delete = async (id: string) => {
    return await this.baseRepository.delete(id);
  }


}
