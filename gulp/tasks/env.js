/**
 * Development mode - {--dev, --prod}
 */
export const production = process.argv.indexOf('--prod') !== -1;
export const mode = production ? "production" : "development";
