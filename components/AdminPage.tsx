
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import AddUserModal from './AddUserModal';

interface UserWithRole {
  user_id: string;
  email: string;
  role: string;
}

interface AdminPageProps {
  onBack: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onBack }) => {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);


  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.rpc('get_users_with_roles');
      if (error) throw error;
      setUsers(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'user') => {
    setUpdatingUserId(userId);
    setError(null);
    try {
      // FIX: Call a secure RPC function instead of a direct upsert from the client.
      // This bypasses the client's RLS context, resolving the foreign key constraint error.
      const { error } = await supabase.rpc('admin_update_user_role', {
        target_user_id: userId,
        new_role: newRole,
      });
      
      if (error) throw error;

      // Refresh user list to show the change
      fetchUsers();

    } catch (err: any) {
      setError(err.message);
    } finally {
      setUpdatingUserId(null);
    }
  };
  
  return (
    <div>
      <button onClick={onBack} className="text-sm font-medium text-[#168a40] hover:underline flex items-center mb-2">
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        Quay lại Cổng
      </button>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Admin</h1>
        <button 
          onClick={() => setAddUserModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#168a40] hover:bg-[#116c32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#168a40]"
        >
          <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 11a1 1 0 100-2 1 1 0 000 2z" />
            <path fillRule="evenodd" d="M16 12.5a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M18.5 14a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5zM15 14.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5z" clipRule="evenodd" />
          </svg>
          Thêm người dùng
        </button>
      </div>

      {isLoading && <p>Đang tải danh sách người dùng...</p>}
      {error && <p className="text-red-600">Lỗi: {error}</p>}
      
      {!isLoading && !error && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {users.map((user) => (
              <li key={user.user_id}>
                <div className="px-4 py-4 sm:px-6 flex items-center justify-between hover:bg-gray-50">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                    <p className={`text-sm mt-1 capitalize ${user.role === 'admin' ? 'text-green-600 font-semibold' : 'text-gray-500'}`}>
                      {user.role}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {user.email !== 'vpi.sonnt@pvn.vn' && (
                        user.role === 'admin' ? (
                            <button
                                onClick={() => handleRoleChange(user.user_id, 'user')}
                                disabled={updatingUserId === user.user_id}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-400"
                            >
                                {updatingUserId === user.user_id ? '...' : 'Xóa Admin'}
                            </button>
                        ) : (
                            <button
                                onClick={() => handleRoleChange(user.user_id, 'admin')}
                                disabled={updatingUserId === user.user_id}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-200"
                            >
                                {updatingUserId === user.user_id ? '...' : 'Thêm Admin'}
                            </button>
                        )
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isAddUserModalOpen && (
        <AddUserModal 
          onClose={() => {
            setAddUserModalOpen(false);
            fetchUsers(); // Refresh list after potential add
          }} 
        />
      )}
    </div>
  );
};

export default AdminPage;