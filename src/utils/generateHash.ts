/**
 * The suite used to generate random string
 */
const symbolSuite =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Generate string with random symbols [A-Za-z0-9] with provided length
 * @param length - the output string length
 * @returns Random string
 * @throws {@link Error} Thrown when string length less then 0
 */
export function generateHash(length: number): string {
  if (length < 0) throw new Error('length should be greater or equal to 0');
  if (length === 0) return '';

  return Array.from(
    { length },
    () => symbolSuite[Math.floor(Math.random() * symbolSuite.length)]
  ).join('');
}
