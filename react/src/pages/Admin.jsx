import { useEffect, useState } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import Layout from '../components/Layout';
import api from '../api/api';

export default function Admin() {
    const { appointments, fetchAllAppointments, updateStatus } = useAppointments();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAllAppointments();
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/admin/users');
            setUsers(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch users');
        }
    };

    const handleStatus = async (id, status) => {
        try {
            await updateStatus(id, status);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update');
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

                {error && <p className="text-red-500 text-sm mb-4 p-3 bg-red-50 rounded-lg">{error}</p>}

                <h2 className="text-lg font-semibold text-gray-700 mb-3">All Appointments</h2>
                <div className="space-y-3 mb-10">
                    {appointments.map((apt) => (
                        <div key={apt.id} className="p-4 bg-white rounded-xl shadow flex justify-between items-center">
                            <div>
                                <span className="font-semibold text-gray-800">{apt.user?.name}</span>
                                <span className="text-gray-500 mx-2">—</span>
                                <span className="text-gray-600">{apt.date} at {apt.time}</span>
                                <span className={`ml-3 text-sm px-2 py-1 rounded-full ${
                                    apt.status === 'approved' ? 'bg-green-100 text-green-700' :
                                    apt.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {apt.status}
                                </span>
                            </div>
                            {apt.status === 'pending' && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleStatus(apt.id, 'approved')}
                                        className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleStatus(apt.id, 'rejected')}
                                        className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                    {appointments.length === 0 && (
                        <p className="text-gray-500 text-center py-6">No appointments</p>
                    )}
                </div>

                <h2 className="text-lg font-semibold text-gray-700 mb-3">All Users</h2>
                <div className="space-y-3">
                    {users.map((user) => (
                        <div key={user.id} className="p-4 bg-white rounded-xl shadow flex justify-between items-center">
                            <div>
                                <span className="font-semibold text-gray-800">{user.name}</span>
                                <span className="text-gray-500 ml-3">{user.email}</span>
                            </div>
                            <span className={`text-sm px-3 py-1 rounded-full ${
                                user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                                {user.role}
                            </span>
                        </div>
                    ))}
                    {users.length === 0 && (
                        <p className="text-gray-500 text-center py-6">No users</p>
                    )}
                </div>
            </div>
        </Layout>
    );
}
