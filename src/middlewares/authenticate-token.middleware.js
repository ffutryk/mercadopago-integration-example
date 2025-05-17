import { authService } from '../di/auth.container.js';
import { InvalidTokenError, NoTokenProvidedError } from '../errors/errors.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new NoTokenProvidedError();

    if (!authHeader.startsWith('Bearer ')) throw new InvalidTokenError();

    const token = authHeader.split(' ')[1];

    const user = await authService.validateToken({ token });

    req.user = user;

    return next();
  } catch (e) {
    next(e);
  }
};
