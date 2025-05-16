import {
  InvalidEmailError,
  MissingEmailError,
  MissingPasswordError,
  MissingNameError,
  MissingSurnameError,
  PasswordTooShortError,
} from '../errors/errors.js';
import { isValidEmail } from '../utils/utils.js';

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(req, res, next) {
    try {
      const { email, password, name, surname } = req.body;

      if (!email) throw new MissingEmailError();
      if (!password) throw new MissingPasswordError();
      if (!name) throw new MissingNameError();
      if (!surname) throw new MissingSurnameError();

      if (!isValidEmail(email)) throw new InvalidEmailError();
      if (password.length < 6) throw new PasswordTooShortError();

      const dto = {
        email,
        password,
        name,
        surname,
      };

      const { token } = await this.authService.register(dto);

      return res.status(200).json({ success: true, data: { token } });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw new MissingEmailError();
      if (!password) throw new MissingPasswordError();
      if (!isValidEmail(email)) throw new InvalidEmailError();

      const dto = {
        email,
        password,
      };

      const { token, user } = await this.authService.login(dto);

      const { password: _, ...userWithoutPassword } = user;

      return res
        .status(200)
        .json({ success: true, data: { token, user: userWithoutPassword } });
    } catch (err) {
      next(err);
    }
  }
}
