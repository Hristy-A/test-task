import type { FetchOptions } from 'types/FetchOptions';
import type { User } from 'types/User';
import * as randomUserApi from 'api/randomUserApi';

/**
 * Function call random user api {@link randomUserApi.fetchUsers fetchUsers} and returns bushiness layer entity {@link User}
 * @param fetchOptions - {@link FetchOptions} request configuration with optional page, limit, and seed params
 * @returns Array with {@link UserDto}
 * @throws {@link Error} Thrown if page parameter less then 1.
 * @throws {@link Error} Thrown if limit parameter less then 1.
 * @throws {@link Error} Thrown if seed is empty or only whitespace.
 */
export async function fetchUsers(
  fetchOptions: FetchOptions = {}
): Promise<User[]> {
  const usersDto = await randomUserApi.fetchUsers(fetchOptions);

  return usersDto.map(
    (userDto) =>
      ({
        firstName: userDto.name.first,
        lastName: userDto.name.last,
        email: userDto.email,
        picture: userDto.picture.large,
      } as User)
  );
}
