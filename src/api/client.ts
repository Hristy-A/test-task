import { isError } from 'utils/isError';

import type { Response } from 'types/Response';

/**
 * Axios like wrapper over original fetch
 * @param endpoint - string, {@link Request}, or {@link URL}
 * @param customConfig - the same options ({@link RequestInit}) as fetch
 * @returns Object {@link Response} with data and additional response info
 */
export async function client<T>(
  endpoint: RequestInfo | URL,
  { body, ...customConfig }: RequestInit = {}
): Promise<Response<T>> {
  const headers = { 'Content-Type': 'application/json' };

  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data: T;
  try {
    const response = await fetch(endpoint, config);
    data = (await response.json()) as T;
    if (response.ok) {
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      };
    }
    throw new Error(response.statusText);
  } catch (err) {
    if (isError(err)) return Promise.reject(err.message);
    return Promise.reject(new Error());
  }
}

/**
 * Axios like get function wrapper over original fetch get method
 * @param endpoint - string, {@link Request}, or {@link URL}
 * @param customConfig - the same options ({@link RequestInit}) as fetch
 * @returns Object {@link Response} with data and additional response info
 */
client.get = function get<T = unknown>(
  endpoint: RequestInfo | URL,
  customConfig: RequestInit = {}
) {
  return client<T>(endpoint, { ...customConfig, method: 'GET' });
};

/**
 * Axios like post function wrapper over original fetch post method
 * @param endpoint - string, {@link Request}, or {@link URL}
 * @param body - request body
 * @param customConfig - the same options ({@link RequestInit}) as fetch
 * @returns Object {@link Response} with data and additional response info
 */
client.post = function post<T = unknown>(
  endpoint: RequestInfo | URL,
  body: BodyInit | null | undefined,
  customConfig: RequestInit = {}
) {
  return client<T>(endpoint, { ...customConfig, body });
};
