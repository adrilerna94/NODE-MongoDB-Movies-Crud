// Implements business logic for user operations.
// Processes requests from the controller and interacts with the repository as needed.

import { httpStatus } from '../config/httpStatusCodes';
import { AppError } from '../utils/application.error';
import { MovieRepository } from '../repositories/movie.repository';
import { IMovie } from '../interfaces/movie.interface';

export class MovieService {
  private readonly movieRepository: MovieRepository;

  constructor() {
    this.movieRepository = new MovieRepository();
  }

  getById = async (id: string) => {
    const movie = await this.movieRepository.getById(id);
    if (!movie) {
      throw new AppError('movie not found', httpStatus.NOT_FOUND);
    }
    return movie;
  };

  getAll = (pagination: { skip: number; limit: number }) => {
    const MAX_LIMIT = 100;
    if (pagination.limit > MAX_LIMIT) {
      pagination.limit = MAX_LIMIT;
    }
    const filters = {};
    return this.movieRepository.find(filters, pagination);
  };
  createMovie = async (movie: IMovie) => {
    const filteredMovie = {
      userId: movie.userId,
      title: movie.title,
      plot: movie.plot,
      directors: movie.directors,
      released: movie.released
    }
    return await this.movieRepository.create(filteredMovie);
  };
  updateMovie = async (id: string, data: Partial<IMovie>) => {
    // usuario autenticado que actualiza la movie
    const userId = data.userId;
    const movietoUpdate = await this.movieRepository.getById(id);
    if (!movietoUpdate) {
      throw new AppError(`Movie with ID ${id} NOT FOUND`, httpStatus.NOT_FOUND);
    }
    // Lista de palabras prohibidas
    const prohibited = ['porn', 'sex'];
    // validar si plot está en data y no es undefined
    if (data.plot) {
      // Normalizar datos ➡️ minúsculas y quitar espacios inicio y final.
      const normalizedPlot = data.plot.toLowerCase().trim();
      // Filtrar palabras prohibidas
      const prohibitedWords = prohibited.filter(word => normalizedPlot.includes(word));
      if (prohibitedWords.length > 0){
        throw new AppError(`Movie can't contain banned words: ${prohibitedWords.join(', ')}`, httpStatus.BAD_REQUEST);
      }
    }
    // validar que la movie pertenece al usuario autenticado
    if (movietoUpdate.userId.toString() !== userId) {
      throw new AppError('You are not allowed to modify this movie', httpStatus.FORBIDDEN)
    }

    return this.movieRepository.update(id, data);
  }
  deleteMovie = async (id: string, userId: string) => {
    const movieToDelete = await this.movieRepository.getById(id);
    if(!movieToDelete) {
      throw new AppError(`Movie with ID ${id} NOT FOUND`, httpStatus.NOT_FOUND);
    }
    if (movieToDelete.userId.toString() !== userId ){
      throw new AppError (`You are not allowed to delete this movie`, httpStatus.FORBIDDEN);
    }
    return this.movieRepository.delete(id);
  }
}
