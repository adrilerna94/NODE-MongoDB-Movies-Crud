// Handles direct data operations related to users.
// This layer interacts with the database or a data source to perform CRUD operations.

import { MovieModel, IMovieModel } from '../models/movie.model';
import { IMovie } from '../interfaces/movie.interface';
import { BaseRepository } from './base.repository';

export class MovieRepository {
  private readonly baseRepository: BaseRepository<IMovieModel>;
  private readonly defaultProjection: { [key: string]: 1 | 0};

  constructor() {
    this.baseRepository = new BaseRepository(MovieModel);
    this.defaultProjection = { id: 0, plot: 0, genres: 0, year: 0}; // 🔥 Se excluye __v correctamente
  }

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
  create = async (movie: IMovie) => {
    const filteredMovie: IMovie = {
      userId: movie.userId,
      title: movie.title,
      plot: movie.plot,
      directors: movie.directors,
      released: movie.released,
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
