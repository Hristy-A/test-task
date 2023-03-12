/**
 * Declarations for import static resource on build (need for ts)
 */

declare module '*.png' {
  const path: string;
  export default path;
}
declare module '*.jpg' {
  const path: string;
  export default path;
}
declare module '*.css' {
  const path: string;
  export default path;
}
