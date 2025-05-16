import { HttpError } from './http-error.js';

export class InvalidWebhookRequest extends HttpError {
  constructor() {
    const messages = {
      en: 'The webhook request is invalid',
      es: 'La petición del webhook es inválida',
    };

    super(401, messages);
  }
}

export class UserExistsError extends HttpError {
  constructor() {
    const messages = {
      en: 'User already exists',
      es: 'Usuario ya existe',
    };

    super(409, messages);
  }
}

export class WrongCredentialsError extends HttpError {
  constructor() {
    const messages = {
      en: 'Wrong credentials',
      es: 'Credenciales incorrectas',
    };

    super(401, messages);
  }
}

export class MissingEmailError extends HttpError {
  constructor() {
    const messages = {
      en: 'Email is required',
      es: 'Se requiere un correo electrónico',
    };

    super(400, messages);
  }
}

export class MissingPasswordError extends HttpError {
  constructor() {
    const messages = {
      en: 'Password is required',
      es: 'Se requiere una contraseña',
    };

    super(400, messages);
  }
}

export class MissingNameError extends HttpError {
  constructor() {
    const messages = {
      en: 'Name is required',
      es: 'Se requiere un nombre',
    };

    super(400, messages);
  }
}

export class MissingSurnameError extends HttpError {
  constructor() {
    const messages = {
      en: 'Surname is required',
      es: 'Se requiere un apellido',
    };

    super(400, messages);
  }
}

export class InvalidEmailError extends HttpError {
  constructor() {
    const messages = {
      en: 'Invalid email format',
      es: 'Formato de correo electrónico inválido',
    };

    super(400, messages);
  }
}

export class PasswordTooShortError extends HttpError {
  constructor() {
    const messages = {
      en: 'Password must be at least 6 characters long',
      es: 'La contraseña debe tener al menos 6 caracteres',
    };

    super(400, messages);
  }
}

export class InvalidTokenError extends HttpError {
  constructor() {
    const messages = {
      en: 'Invalid access token',
      es: 'Token de acceso inválido',
    };

    super(401, messages);
  }
}

export class ExpiredTokenError extends HttpError {
  constructor() {
    const messages = {
      en: 'Access token has expired',
      es: 'Token de acceso ha expirado',
    };

    super(401, messages);
  }
}

export class UnauthorizedError extends HttpError {
  constructor() {
    const messages = {
      en: 'Not authorized to perform this action',
      es: 'No está autorizado para realizar esta acción',
    };

    super(401, messages);
  }
}

export class NoTokenProvidedError extends HttpError {
  constructor() {
    const messages = {
      en: 'No access token provided',
      es: 'No se ha proporcionado un token de acceso',
    };

    super(401, messages);
  }
}
