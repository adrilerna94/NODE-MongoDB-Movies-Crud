// Mongoose schema and model definition for the User entity.
// Defines the structure of user documents in the database.

import mongoose, { Model, Document, Schema } from 'mongoose';
import { IMovie } from '../interfaces/movie.interface';

export interface IMovieModel extends IMovie, Document {
  _id: mongoose.Types.ObjectId;
}

// actualizamos Schema para hacer registro user
  // email: {type: String, required: true},
  // password: {type: String, required: true},
  // username: {type: String, required: false},

  const movieSchema = new mongoose.Schema({
  // Relación con  el usuario autenticado
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true},

  // propiedades movie requeridas
  title: { type: String, required: true },
  plot: { type: String, required: true },
  released: { type: Date, required: true },
  directors: { type: [String], required: true },

  // propiedades opcionales
  genres: { type: [String], required: false },
  runtime: { type: Number, required: false, min: 1 },
  cast: { type: [String], required: false },
  poster: { type: String, required: false },

  fullplot: { type: String, required: false },
  languages: { type: [String], required: false },

  rated: { type: String, required: false },
  awards: { type: Object, required: false },
  lastupdated: { type: String, required: false },
  year: { type: Number, required: false, min: 1800, max: new Date().getFullYear() },
  imdb: { type: Object, required: false },
  countries: { type: [String], required: false },
  type: { type: String, enum: ['movie', 'series', 'documentary'], required: false },
  tomatoes: { type: Object, required: false },
  num_mflix_comments: { type: Number, required: false, min: 0 }
});

const MovieModel: Model<IMovieModel> = mongoose.model<IMovieModel>('Movie', movieSchema);

export { MovieModel };
