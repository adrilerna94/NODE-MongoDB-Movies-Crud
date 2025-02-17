// Middleware to validate request payloads using Joi schemas.
// Ensures that incoming requests meet the required structure and data types.

import { type NextFunction, type Request, type Response } from 'express';
import type Joi from 'joi';
import { httpStatus } from '../config/httpStatusCodes';

export enum ValidationSource {
  BODY = 'body',
  QUERY = 'query',
  PARAMS = 'params',
}

export const validate = <ReqParams, ReqBody, ReqQuery>(schema: Joi.ObjectSchema, source: ValidationSource) => {
  return (req: Request<ReqParams, never, ReqBody, ReqQuery>, res: Response, next: NextFunction) => {
    const objToValidate: ReqParams | ReqBody | ReqQuery = req[source];
    if (!objToValidate) {
      next(new Error('Validation type not supported'));
      return;
    }
    const result = schema.validate(objToValidate, { abortEarly: false });
    if (result.error) {
      const responseObj = { msg: result.error.details.map((detail) => detail.message) };
      res.status(httpStatus.BAD_REQUEST).send(responseObj);
    } else {
      next();
    }
  };
};
