import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';

interface AddUserModalProps {
    onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ onClose }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [title, setTitle] = useState('');
    const [role, setRole] = useState<'user' | 'admin'>('user');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const clearForm = () => {
        setFullName('');
        setEmail('');
        setDepartment('');
        setTitle('');
        setRole('user');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName.trim() || !email.trim() || !department.trim()) {
            setError('Vui lòng điền đầy đủ các trường Họ tên, Email và Đơn vị.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const userMetadata = {
                full_name: fullName,
                department,
                title,
                role,
            };

            // FIX: The userMetadata object is passed directly to the updated RPC function.
            // This corrects the payload format and resolves the invite error.
            const { error: rpcError } = await supabase.rpc('admin_invite_user', {
                invite_email: email,
                user_metadata: userMetadata,
            });

            if (rpcError) throw rpcError;

            setSuccess(`Đã gửi lời mời thành công đến ${email}.`);
            clearForm();
            setTimeout(() => {
                onClose();
            }, 2500);

        } catch (err: any) {
            console.error('Error inviting user:', err);
            // FIX: Provide a more descriptive error message by checking for `err.message`.
            // If it doesn't exist, stringify the error to avoid "[object Object]".
            const errorMessage = err.message || JSON.stringify(err);
            setError(`Đã có lỗi xảy ra: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <div className="flex justify-between items-start">
                            <h2 className="text-2xl font-bold text-gray-800">Thêm người dùng</h2>
                            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">Điền thông tin để cấp quyền truy cập hệ thống.</p>
                        
                        <div className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Họ tên</label>
                                <input type="text" name="fullName" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#168a40] focus:border-[#168a40] sm:text-sm" placeholder="Nguyễn Văn A" />
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#168a40] focus:border-[#168a40] sm:text-sm" placeholder="nguoidung@pvn.vn" />
                            </div>
                             <div>
                                <label htmlFor="department" className="block text-sm font-medium text-gray-700">Đơn vị</label>
                                <input type="text" name="department" id="department" value={department} onChange={e => setDepartment(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#168a40] focus:border-[#168a40] sm:text-sm" placeholder="Nhập đơn vị (viết tắt)" />
                            </div>
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Chức danh (không bắt buộc)</label>
                                <input type="text" name="title" id="title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#168a40] focus:border-[#168a40] sm:text-sm" placeholder="Trưởng phòng" />
                            </div>
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Vai trò</label>
                                <select id="role" name="role" value={role} onChange={e => setRole(e.target.value as 'user' | 'admin')} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#168a40] focus:border-[#168a40] sm:text-sm rounded-md">
                                    <option value="user">Người xem</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        {error && <p className="text-sm text-red-600 mb-3 text-center">{error}</p>}
                        {success && <p className="text-sm text-green-600 mb-3 text-center">{success}</p>}
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={clearForm}
                                disabled={isLoading}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#168a40]"
                            >
                                Xóa nội dung
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#168a40] hover:bg-[#116c32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#168a40] disabled:bg-gray-400"
                            >
                                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 11a1 1 0 100-2 1 1 0 000 2z" />
                                  <path fillRule="evenodd" d="M16 12.5a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5z" clipRule="evenodd" />
                                  <path fillRule="evenodd" d="M18.5 14a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5zM15 14.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5z" clipRule="evenodd" />
                                </svg>
                                {isLoading ? 'Đang gửi...' : 'Thêm người dùng'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;