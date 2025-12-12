import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppointmentProvider } from './context/AppointmentContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import './App.css';

function ProtectedRoute({ children, adminOnly = false }) {
    const { user, loading } = useAuth();
    
    if (loading) return <div className="p-4">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" />;
    
    return children;
}

function AppRoutes() {
    const { user, loading } = useAuth();
    
    if (loading) return <div className="p-4">Loading...</div>;
    
    return (
        <Routes>
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/dashboard" element={
                <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/admin" element={
                <ProtectedRoute adminOnly><Admin /></ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppointmentProvider>
                    <AppRoutes />
                </AppointmentProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
