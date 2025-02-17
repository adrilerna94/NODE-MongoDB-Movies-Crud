// Manages HTTP requests related to Movies.
// Contains methods for handling routes like GET, POST, PUT, DELETE for Movies.
// Delegates business logic to the Movie service.

import { NextFunction, type Request, type Response } from 'express';
// import { httpStatus } from '../config/httpStatusCodes';
import { MovieService } from '../services/movie.service';
import { httpStatus } from '../config/httpStatusCodes';
// import { Http2ServerResponse } from 'http2';

export class MovieController {
  private movieService: MovieService;

  constructor() {
    this.movieService = new MovieService();
  }

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const movie = await this.movieService.getById(req.params.id);
      const filteredMovie = {
        id: movie.id,
        title: movie.title,
        released: movie.released,
        directors: movie.directors.join(',')
      };
      const response = {
        message: 'Movie fetched successfully',
        filteredMovie
      };
      res.send(response);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { skip = 0, limit = 10 } = req.query;

      const pagination = {
        skip: parseInt(skip as string, 10),
        limit: parseInt(limit as string, 10),
      };

      const movies = await this.movieService.getAll(pagination);
      const filteredMovies = movies.map((movie)=> ({
         id: movie._id,
         title: movie.title,
         released: movie.released,
         directors: movie.directors,
      }));

      const response = {
        message: 'Movies fetched successfully',
        length: movies.length,
        //data: movies,
        filteredMovies,
        data: movies,
      };
      res.send(response);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newMovie = await this.movieService.createMovie(req.body);
      const response = {
        message: 'Movie created successfully',
        data: newMovie
      };
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const newMovie = req.body;
      const movie = await this.movieService.updateMovie(id, newMovie);
      const response = {
        message: 'Movie Updated successfully',
        updates: newMovie,
        movie
      };
      res.send(response)
    } catch (error) {
      next(error);
    }
  }
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.movieService.deleteMovie(id);
      // const response = {
      //   message: 'Movie Deleted successfully',
      //   movieToDelete
      // };
      // res.send(response)
      res.status(httpStatus.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  }
}
