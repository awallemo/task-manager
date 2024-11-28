import React, { useEffect, useState } from 'react';
import { User } from '../types/task';
import { getUsers } from '../api/users';
import { UserCircle } from 'lucide-react';

interface UserSelectProps {
  value: string | undefined;
  onChange: (userId: string | undefined) => void;
}

export const UserSelect: React.FC<UserSelectProps> = ({ value, onChange }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Failed to load users:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, []);

  if (isLoading) {
    return <div className="animate-pulse h-10 bg-gray-200 rounded"></div>;
  }

  return (
    <div className="relative">
      <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <select
        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        value={value || ''}
        onChange={(e) => onChange(e.target.value || undefined)}
      >
        <option value="">Unassigned</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};