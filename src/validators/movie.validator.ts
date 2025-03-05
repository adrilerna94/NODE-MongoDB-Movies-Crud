// Defines Joi schemas for validating movie-related requests.
// Ensures that incoming data adheres to the required structure and rules.

import Joi from 'joi';

export class MovieValidator {
  private static id = Joi.string().hex().length(24);
  private static skip = Joi.number().min(0);
  private static limit = Joi.number().min(1).max(100);

  static movieIdSchema = Joi.object({ id: MovieValidator.id.required() });

  static moviePaginationSchema = Joi.object({
    skip: MovieValidator.skip,
    limit: MovieValidator.limit,
  }).with('skip', 'limit');

  // static movieSchema = Joi.object({
  //   plot: Joi.string().required(),
  //   genres: Joi.array().items(Joi.string()).min(1).required(),
  //   runtime: Joi.number().integer().positive().required(),
  //   cast: Joi.array().items(Joi.string()).min(1).required(),
  //   poster: Joi.string().uri().required(),
  //   title: Joi.string().required(),
  //   fullplot: Joi.string().required(),
  //   languages: Joi.array().items(Joi.string()).min(1).required(),
  //   released: Joi.date().iso().required(),
  //   directors: Joi.array().items(Joi.string()).min(1).required(),
  //   rated: Joi.string().required(),
  //   awards: Joi.object().required(),
  //   lastupdated: Joi.string().required(),
  //   year: Joi.number().integer().min(1800).max(new Date().getFullYear()).required(),
  //   imdb: Joi.object().required(),
  //   countries: Joi.array().items(Joi.string()).min(1).required(),
  //   type: Joi.string().valid('movie', 'series', 'documentary').required(),
  //   tomatoes: Joi.object().required(),
  //   num_mflix_comments: Joi.number().integer().min(0).required()
  // });

  static movieSchema = Joi.object({
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

  static movieRegisterSchema = Joi.object({
    username: Joi.string()
    .pattern(/^[A-Za-z0-9]{3,15}$/) //Entre 3 y 15 palabras y/o números
    .messages({
      'string.pattern.base': 'The username must be between 3 and 15 letters with digits without spaces and symbols.',
      'string.min': 'The username must be at least 3 characters long.',
      'string.max': 'The maximum length must be 15 characters long.',
      'any.required': 'The username field is required.'
    })
    .required(),
    password: Joi.string()
    .pattern(/^[A-Za-z]{6,20}$/) // palabra de entre 6 y 20 letras sin espacios
    .messages({
      'string.pattern.base': 'The password must be between 6 and 20 letters without spaces.',
      'string.min': 'The password must be at least 6 characters long.',
      'string.max': 'The maximum length must be 20 characters long.',
      'any.required': 'The password field is required.'
    })
    .required(),
    email: Joi.string().email().required(),
  })
  static movieLoginSchema = Joi.object({
    password: Joi.string()
    .pattern(/^[A-Za-z]{6,20}$/) // palabra de entre 6 y 20 letras sin espacios
    .messages({
      'string.pattern.base': 'The password must be between 6 and 20 letters without spaces.',
      'string.min': 'The password must be at least 6 characters long.',
      'string.max': 'The maximum length must be 20 characters long.',
      'any.required': 'The password field is required.'
    })
    .required(),
    email: Joi.string().email().required(),
  })
}
