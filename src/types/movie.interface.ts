// Defines the structure of a Movie object using a TypeScript interface.
// Ensures type safety throughout the application when working with movies.

// export interface IMovie {
//   plot: string;
//   genres: string[];
//   runtime: number;
//   cast: string[];
//   poster: string;
//   title: string;
//   fullplot: string;
//   languages: string[];
//   released: Date;
//   directors: string[];
//   rated: string;
//   awards: object;
//   lastupdated: string;
//   year: number;
//   imdb: object;
//   countries: string[];
//   type: 'movie' | 'series' | 'documentary';
//   tomatoes: object;
//   num_mflix_comments: number;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

export interface IMovie {
  title: string; // ✅ Obligatorio
  plot: string; // ✅ Obligatorio
  released: Date; // ✅ Obligatorio
  directors: string[]; // ✅ Obligatorio

  genres?: string[]; // Opcional
  runtime?: number; // Opcional
  cast?: string[]; // Opcional
  poster?: string; // Opcional
  fullplot?: string; // Opcional
  languages?: string[]; // Opcional
  rated?: string; // Opcional
  awards?: object; // Opcional
  lastupdated?: string; // Opcional
  year?: number; // Opcional
  imdb?: object; // Opcional
  countries?: string[]; // Opcional
  type?: 'movie' | 'series' | 'documentary'; // Opcional
  tomatoes?: object; // Opcional
  num_mflix_comments?: number; // Opcional
  createdAt?: Date; // Opcional
  updatedAt?: Date; // Opcional
}
