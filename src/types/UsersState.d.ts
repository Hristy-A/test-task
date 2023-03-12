import type { LoadingStatus } from './LoadingStatus';
import type { User } from './User';

/**
 * User state type
 */
export interface UsersState {
  status: LoadingStatus;
  error: string | null;
  users: User[];
  page: number | null;
  limit: number;
  seed: string;
}
