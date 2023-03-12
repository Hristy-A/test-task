/**
 * Guard for check is provided instance error (contain message field)
 * @param errorCandidate - checking instance
 * @returns boolean is provided instance error
 */
export function isError(errorCandidate: unknown): errorCandidate is Error {
  return (
    typeof errorCandidate === 'object' &&
    errorCandidate !== null &&
    'message' in errorCandidate
  );
}
