/**
 * Generic type with data with provided type and additional response info
 */
export interface Response<T> {
  status: number;
  data: T;
  headers: HeadersInit;
  url: string;
}
