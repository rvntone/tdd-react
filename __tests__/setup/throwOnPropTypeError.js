const originalConsoleError = console.error;

console.error = message => {
  if (/(Failed prop type)/.test(message)) {
    throw new Error(`__PROPTYPE_ERROR__${message}`);
  }

  originalConsoleError(message);
};
