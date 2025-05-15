import { HttpError } from '../errors/http-error.js';

const unknownErrorMessage = {
  en: 'Unknown error',
  es: 'Error desconocido',
};

const supportedLanguages = ['en', 'es'];

export const errorHandler = (err, req, res, _next) => {
  const requestedLanguage = req.headers['accept-language'];

  const language = supportedLanguages.includes(requestedLanguage)
    ? requestedLanguage
    : 'es';

  if (err instanceof HttpError) {
    res.status(err.status).json({
      success: false,
      error: {
        message: err.messages[language],
      },
    });
    return;
  }

  console.error('Error:', err);

  res.status(500).json({
    success: false,
    error: { message: unknownErrorMessage[language] },
  });
};
