import type { Reducer } from 'react';
import { useRef, useCallback, useEffect } from 'react';
import type { UsersAction } from 'store/userSlice';
import type { UsersState } from 'types/UsersState';

import usersReducer, { fetchUsers } from 'store/usersSlice';
import { useEnhancedReducer } from './useEnhancedReducer';
import { useRefIntersection } from './useRefIntersection';

/**
 * Custom hook which encapsulate business logic with infinite scroll
 * @param initialState - initial state for {@link UsersState} slice
 * @param throttleMs - the number of milliseconds which will skipping intersecting after previous fetch (default 10)
 * @returns Object with fields:
 * ref - ref for {@link HTMLElement} used to intersection observer
 * users - fetched users
 * status - loading status
 * error  - error message if fetching failed
 */
export function useInfiniteUserList(initialState: UsersState, throttleMs = 10) {
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

  const throttled = useRef(false);

  const callback = useCallback(() => {
    if (status === 'loading' || page === null) return;
    if (throttled.current) return;

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

    throttled.current = true;
    setTimeout(() => {
      throttled.current = false;
    }, throttleMs);
  }, [dispatch, page, limit, seed, status, throttleMs]);

  const ref = useRefIntersection(callback);

  return { ref, users, status, error };
}
