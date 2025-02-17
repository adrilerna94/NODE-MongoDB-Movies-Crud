// Manages application configuration and environment variables.
// This file centralizes the loading, validation, and export of all environment variables, ensuring consistency and providing default values where necessary.

export const { PORT = 3000, DATABASE_URL, SECRET_KEY } = process.env;
