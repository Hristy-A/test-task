import type { FetchOptions } from 'types/FetchOptions';
import type { UsersState } from 'types/UsersState';
import * as randomUserService from 'services/randomUserService';
import { isError } from 'utils/isError';
import type { Dispatch } from 'react';
import type {
  FetchUsersAction,
  FetchUsersFailedAction,
  FetchUsersSucceededAction,
  UsersAction,
} from './userSlice';

/**
 * Reducer for users slice
 * @param state - immutable state, described in type {@link UsersState}
 * @param action - plane object with type and optional payload fields
 * @returns New state generated based on action
 * @throws {@link Error} Thrown when provided unknown action type
 */
const usersReducer = (state: UsersState, action: UsersAction): UsersState => {
  switch (action.type) {
    case 'users/fetchUsers':
      return { ...state, status: 'loading' };
    case 'users/fetchUsersSucceeded':
      return {
        ...state,
        page: action.payload.page,
        users: state.users.concat(action.payload.users),
        status: 'succeeded',
      };
    case 'users/fetchUsersFailed':
      return {
        ...state,
        status: 'failed',
        error: action.payload,
      };

    default:
      throw new Error('invalid action type');
  }
};

export default usersReducer;

/**
 * Action creator for fetching new users
 * @param fetchOptions - {@link FetchOptions} request configuration with optional page, limit, and seed params
 * @returns Function received original dispatch, which will called when action will resolved or rejected
 */
export const fetchUsers =
  (fetchOptions: FetchOptions) => async (dispatch: Dispatch<UsersAction>) => {
    dispatch({
      type: 'users/fetchUsers',
    } as FetchUsersAction);

    try {
      const users = await randomUserService.fetchUsers(fetchOptions);
      dispatch({
        type: 'users/fetchUsersSucceeded',
        payload: {
          users,
          page: fetchOptions.page,
        },
      } as FetchUsersSucceededAction);
    } catch (error) {
      dispatch({
        type: 'users/fetchUsersFailed',
        payload: isError(error) ? error.message : 'failed fetch users',
      } as FetchUsersFailedAction);
    }
  };
