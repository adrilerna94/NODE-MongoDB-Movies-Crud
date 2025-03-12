import Joi from 'joi';

export class AuthValidator {
  private static readonly email = Joi.string().email();
  private static readonly password = Joi.string();

  static readonly loginSchema = Joi.object({
    email: AuthValidator.email.required(),
    password: AuthValidator.password.required(),
  });
}
