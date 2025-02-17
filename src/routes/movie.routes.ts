// Defines the routes for movie-related operations.
// Maps HTTP methods and endpoints to the corresponding controller methods.

import { Router } from 'express';
import { MovieController } from '../controllers/movie.controller';
import { MovieValidator } from '../validators/movie.validator';
import { validate, ValidationSource } from '../middlewares/validate.middleware';

const movieController = new MovieController();
export const movieRouter = Router();

movieRouter.get('/:id', validate(MovieValidator.movieIdSchema, ValidationSource.PARAMS), movieController.getById);
movieRouter.get('/', validate(MovieValidator.moviePaginationSchema, ValidationSource.QUERY), movieController.getAll);
movieRouter.post('/', validate(MovieValidator.movieSchema, ValidationSource.BODY), movieController.create);
movieRouter.put('/:id', validate(MovieValidator.movieIdSchema, ValidationSource.PARAMS), validate(MovieValidator.movieSchema, ValidationSource.BODY), movieController.update);
movieRouter.delete('/:id', validate(MovieValidator.movieIdSchema, ValidationSource.PARAMS), movieController.delete);
