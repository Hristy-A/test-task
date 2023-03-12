import type { FetchOptions } from 'types/FetchOptions';
import type { UserDto } from 'types/UserDto';
import { client } from 'api/client';

/**
 * Response type from random user api (without meta info)
 */
type RawResponse = {
  results: UserDto[];
};

/**
 * Function which abstract random user api and returns only necessary properties (described in {@link UserDto}) (without meta info)
 * @param fetchOptions - {@link FetchOptions} request configuration with optional page, limit, and seed params
 * @returns Array with {@link UserDto}
 * @throws {@link Error} Thrown if page parameter less then 1.
 * @throws {@link Error} Thrown if limit parameter less then 1.
 * @throws {@link Error} Thrown if seed is empty or only whitespace.
 */
export async function fetchUsers({
  page = 1,
  limit = 30,
  seed = 'def',
}: FetchOptions = {}): Promise<UserDto[]> {
  if (page < 1) throw new Error('page should be greater or equal to 1');
  if (limit < 1) throw new Error('limit should be greater or equal to 1');
  if (seed.length === 0 || /^\s+$/.test(seed))
    throw new Error('seed should be defined with not empty string');

  const response = await client.get<RawResponse>(
    `https://randomuser.me/api/?page=${page}&results=${limit}&seed=${seed}`
  );

  return response.data.results;
}
