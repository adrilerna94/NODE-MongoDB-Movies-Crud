// Middleware for handling authentication and authorization.
// Includes functionality for validating tokens, ensuring protected routes, and managing user roles and permissions to restrict access as needed.

import { Response, NextFunction } from 'express';
import { httpStatus } from '../config/httpStatusCodes';
import { verifyToken } from '../utils/auth/token';
import { AppError } from '../utils/application.error';
import { CustomRequest } from '../interfaces/customRequest.interface';

export const checkToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
  let token = req.header("Authorization");

  if (!token) {
      return next(new AppError("You must be logged in to access this resource.", httpStatus.UNAUTHORIZED));
  }

  // 🔹 Asegurar que el token tenga el formato correcto
  if (token.startsWith("Bearer ")) {
      token = token.replace("Bearer ", "").trim();
  } else {
      return next(new AppError("Invalid token format", httpStatus.UNAUTHORIZED));
  }

  // 🔹 Verificar que el token tenga 3 partes antes de validarlo
  if (token.split(".").length !== 3) {
      console.error("🔴 ERROR: Token con formato incorrecto:", token);
      return next(new AppError("Token mal formado", httpStatus.UNAUTHORIZED));
  }

  try {
      const decoded = verifyToken(token);
      req.userId = decoded.userId;
      next();
  } catch (error) {
      console.error("Error al verificar el token:", error);
      return next(new AppError("Invalid token.", httpStatus.UNAUTHORIZED));
  }
};


