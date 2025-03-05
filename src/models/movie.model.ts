// Mongoose schema and model definition for the User entity.
// Defines the structure of user documents in the database.

import mongoose, { Model, Document } from 'mongoose';
import { IMovie } from '../types/movie.interface';

export interface IMovieModel extends IMovie, Document {
  _id: mongoose.Types.ObjectId;
}

const movieSchema = new mongoose.Schema({
  // actualizamos Schema para hacer registro user
  email: {type: String, required: true},
  password: {type: String, required: true},
  username: {type: String, required: true},
  // propiedades movie
  plot: { type: String, required: false },
  genres: { type: [String], required: false },
  runtime: { type: Number, required: false, min: 1 },
  cast: { type: [String], required: false },
  poster: { type: String, required: false },
  title: { type: String, required: false },
  fullplot: { type: String, required: false },
  languages: { type: [String], required: false },
  released: { type: Date, required: false },
  directors: { type: [String], required: false },
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

// forma profe
// module.exports = mongoose.model('Movie', movieSchema);
// forma segun convenciones
const MovieModel: Model<IMovieModel> = mongoose.model<IMovieModel>('Movie', movieSchema);

export { MovieModel };
