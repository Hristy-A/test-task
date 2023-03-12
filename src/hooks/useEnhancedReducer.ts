import { useCallback, useReducer } from 'react';
import type { Reducer, ReducerState, ReducerAction, Dispatch } from 'react';

/**
 * Thunk function used for async or side effect actions
 */
type Thunk<R extends Reducer<any, any>> = (
  action: Dispatch<ReducerAction<R>>
) => void;

/**
 * Wrapper over the original {@link useReducer} which also accept receive thunk functions (something like thunk middleware)
 * @param reducer default reducer
 * @param initialState default initial state
 * @returns Tuple with default state and enhanced dispatch
 */
export function useEnhancedReducer<R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R> | Thunk<R>>] {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = useCallback(
    (action: ReducerAction<R> | Thunk<R>): void => {
      if (isThunk<R>(action)) {
        return action(dispatch);
      }

      dispatch(action);
    },
    [dispatch]
  );

  return [state, enhancedDispatch];
}

/**
 * Guard for check is provided action thunk function
 * @param thunkCandidate testing action
 * @returns Boolean is action thunk function
 */
function isThunk<R extends Reducer<any, any>>(
  thunkCandidate: unknown
): thunkCandidate is Thunk<R> {
  return typeof thunkCandidate === 'function';
}
