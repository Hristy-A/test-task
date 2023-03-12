import type { UsersState } from 'types/UsersState';

import { useInfiniteUserList } from 'hooks/useInfiniteUserList';
import { generateHash } from 'utils/generateHash';
import Loader from './ui/Loader';
import UserCard from './UserCard';
import FetchError from './ui/FetchError';

/**
 * Initial state for user {@link UsersState}
 */
const initialState: UsersState = {
  status: 'idle',
  error: null,
  users: [],
  limit: 30,
  page: null,
  seed: generateHash(5),
};

/**
 * Smart component for user fetching, handling errors, and render user cards
 * @returns {JSX.Element}
 */
const UsersList = () => {
  const { ref, users, status, error } = useInfiniteUserList(initialState);

  return (
    <div className="p-2 md:m-auto md:w-2/3 min-h-full">
      {users.map((user) => (
        <UserCard key={user.email} user={user} />
      ))}
      {status === 'failed' && (
        <FetchError message={error ?? 'failed load resource'} />
      )}
      <div id="loading-marker" ref={ref} />
      {status === 'loading' && <Loader />}
    </div>
  );
};

export default UsersList;
