import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppointments } from '../context/AppointmentContext';

export default function Layout({ children }) {
    const { user, logout } = useAuth();
    const { clearAppointments } = useAppointments();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        clearAppointments();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex gap-6">
                        <Link to="/dashboard" className="text-gray-700 font-medium hover:text-blue-600">
                            Dashboard
                        </Link>
                        {user?.role === 'admin' && (
                            <Link to="/admin" className="text-gray-700 font-medium hover:text-blue-600">
                                Admin
                            </Link>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">{user?.name}</span>
                        <button 
                            onClick={handleLogout} 
                            className="text-red-600 text-sm font-medium hover:underline"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
            <main className="py-8 px-4">{children}</main>
        </div>
    );
}
