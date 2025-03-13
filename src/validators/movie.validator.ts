// Defines Joi schemas for validating movie-related requests.
// Ensures that incoming data adheres to the required structure and rules.

import Joi from 'joi';

export class MovieValidator {
  private static readonly id = Joi.string().hex().length(24);
  private static readonly skip = Joi.number().min(0);
  private static readonly limit = Joi.number().min(1).max(100);

  public static readonly movieIdSchema = Joi.object({ id: MovieValidator.id.required() });

  public static  readonly moviePaginationSchema = Joi.object({
    skip: MovieValidator.skip,
    limit: MovieValidator.limit,
  }).with('skip', 'limit');

  public static readonly movieSchema = Joi.object({
    title: Joi.string().required(),           // ✅ Requerido
    plot: Joi.string().required(),            // ✅ Requerido
    released: Joi.date().iso().required(),    // ✅ Requerido
    directors: Joi.array().items(Joi.string()).min(1).required(), // ✅ Requerido

    genres: Joi.array().items(Joi.string()).min(1).optional(), // Opcional
    runtime: Joi.number().integer().positive().optional(),
    cast: Joi.array().items(Joi.string()).min(1).optional(),
    poster: Joi.string().uri().optional(),
    fullplot: Joi.string().optional(),
    languages: Joi.array().items(Joi.string()).min(1).optional(),
    rated: Joi.string().optional(),
    awards: Joi.object().optional(),
    lastupdated: Joi.string().optional(),
    year: Joi.number().integer().min(1800).max(new Date().getFullYear()).optional(),
    imdb: Joi.object().optional(),
    countries: Joi.array().items(Joi.string()).min(1).optional(),
    type: Joi.string().valid('movie', 'series', 'documentary').optional(),
    tomatoes: Joi.object().optional(),
    num_mflix_comments: Joi.number().integer().min(0).optional(),
  });
}
