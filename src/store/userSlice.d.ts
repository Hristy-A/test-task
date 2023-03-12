/**
 * Action represents users start fetching
 */
export type FetchUsersAction = {
  type: 'users/fetchUsers';
};

/**
 * Action represents users failed fetch
 */
export type FetchUsersFailedAction = {
  type: 'users/fetchUsersFailed';
  payload: string;
};

/**
 * Action represents users successful fetched
 */
export type FetchUsersSucceededAction = {
  type: 'users/fetchUsersSucceeded';
  payload: {
    users: User[];
    page: number;
  };
};

/**
 * The set of actions available for user slice
 */
export type UsersAction =
  | FetchUsersAction
  | FetchUsersFailedAction
  | FetchUsersSucceededAction;
