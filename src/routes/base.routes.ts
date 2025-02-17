// Main router file that configures and combines all API routes.
// Includes middleware and error handling for the application.

import express, { Router } from 'express';
import { errorMiddleware } from '../middlewares/error.middleware';
import { movieRouter } from './movie.routes';

export const baseRouter = Router();

baseRouter.use(express.json());

baseRouter.use('/movies', movieRouter);

baseRouter.use(errorMiddleware);
