export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

export const isValidArrayOfItems = (input) =>
  Array.isArray(input) &&
  input.every(
    (item) =>
      typeof item === 'object' &&
      item !== null &&
      typeof item.uid === 'string' &&
      typeof item.quantity === 'number'
  );
