import { useEffect, useState } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import Layout from '../components/Layout';

export default function Dashboard() {
    const { appointments, fetchAppointments, createAppointment, cancelAppointment } = useAppointments();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await createAppointment(date, time);
            setDate('');
            setTime('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create');
        }
    };

    const handleCancel = async (id) => {
        try {
            await cancelAppointment(id);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to cancel');
        }
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Appointments</h1>

                <form onSubmit={handleCreate} className="mb-8 p-4 bg-white rounded-xl shadow flex gap-3 items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                        Add
                    </button>
                </form>

                {error && <p className="text-red-500 text-sm mb-4 p-3 bg-red-50 rounded-lg">{error}</p>}

                <div className="space-y-3">
                    {appointments.map((apt) => (
                        <div key={apt.id} className="p-4 bg-white rounded-xl shadow flex justify-between items-center">
                            <div>
                                <span className="font-semibold text-gray-800">{apt.date}</span>
                                <span className="text-gray-500 ml-2">at {apt.time}</span>
                                <span className={`ml-3 text-sm px-2 py-1 rounded-full ${
                                    apt.status === 'approved' ? 'bg-green-100 text-green-700' :
                                    apt.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {apt.status}
                                </span>
                            </div>
                            {apt.status === 'pending' && (
                                <button
                                    onClick={() => handleCancel(apt.id)}
                                    className="text-red-600 text-sm font-medium hover:underline"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    ))}
                    {appointments.length === 0 && (
                        <p className="text-gray-500 text-center py-8">No appointments yet</p>
                    )}
                </div>
            </div>
        </Layout>
    );
}
