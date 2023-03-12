import { memo } from 'react';
import type { User } from 'types/User';

type UserCardProps = {
  user: User;
};

/**
 * Dumb component for renders user card
 * @param props - received user info {@link UserCardProps}
 * @returns {JSX.Element}
 */
const UserCard = ({ user }: UserCardProps) => (
  <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow mb-4 overflow-hidden">
    <img
      className="object-cover h-full"
      src={user.picture}
      alt={`${user.firstName} ${user.lastName}`}
    />
    <div className="flex flex-col justify-between p-4 leading-normal">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {`${user.firstName} ${user.lastName}`}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {user.email}
      </p>
    </div>
  </div>
);

export default memo(UserCard);
