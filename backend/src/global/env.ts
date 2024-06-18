// Determine if the environment is development
export const isDev = process.env.NODE_ENV === 'development';

// Get the current working directory
export const cwd = process.cwd();

/**
 * Base type interface
 */
export type BaseType = boolean | number | string | undefined | null;

/**
 * Format environment variable
 * @param key The key of the environment variable
 * @param defaultValue Default value
 * @param callback Formatting function
 */
function formatValue<T extends BaseType = string>(
  key: string,
  defaultValue: T,
  callback?: (value: string) => T,
): T {
  const value: string | undefined = process.env[key];
  if (typeof value === 'undefined') return defaultValue;

  if (!callback) return value as unknown as T;

  return callback(value);
}

// Get environment variable as string
export function env(key: string, defaultValue = '') {
  return formatValue(key, defaultValue);
}

// Get environment variable as string
export function envString(key: string, defaultValue = '') {
  return formatValue(key, defaultValue);
}

// Get environment variable as number
export function envNumber(key: string, defaultValue = 0) {
  return formatValue(key, defaultValue, (value) => {
    try {
      return Number(value);
    } catch {
      throw new Error(`${key} environment variable is not a number`);
    }
  });
}

// Get environment variable as boolean
export function envBoolean(key: string, defaultValue = false) {
  return formatValue(key, defaultValue, (value) => {
    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(`${key} environment variable is not a boolean`);
    }
  });
}
