import type { Reducer } from 'react';
import { useCallback, useEffect } from 'react';
import type { UsersAction } from 'store/userSlice';
import type { UsersState } from 'types/UsersState';

import usersReducer, { fetchUsers } from 'store/usersSlice';
import { useEnhancedReducer } from './useEnhancedReducer';
import { useRefIntersection } from './useRefIntersection';

/**
 * Custom hook which encapsulate business logic with infinite scroll
 * @param initialState - initial state for {@link UsersState} slice
 * @returns Object with fields:
 * ref - ref for {@link HTMLElement} used to intersection observer
 * users - fetched users
 * status - loading status
 * error  - error message if fetching failed
 */
export function useInfiniteUserList(initialState: UsersState) {
  const [{ users, status, error, limit, page, seed }, dispatch] =
    useEnhancedReducer<Reducer<UsersState, UsersAction>>(
      usersReducer,
      initialState
    );

  useEffect(() => {
    dispatch(
      fetchUsers({
        limit,
        seed,
        page: 1,
      })
    );
  }, [dispatch, limit, seed]);

  const callback = useCallback(() => {
    if (status === 'loading' || page === null) return;

    let fetchPage: number;

    if (page === null) {
      fetchPage = 1;
    } else if (status === 'failed') {
      fetchPage = page;
    } else {
      fetchPage = page + 1;
    }

    dispatch(
      fetchUsers({
        limit,
        seed,
        page: fetchPage,
      })
    );
  }, [dispatch, page, limit, seed, status]);

  const ref = useRefIntersection(callback);

  return { ref, users, status, error };
}
