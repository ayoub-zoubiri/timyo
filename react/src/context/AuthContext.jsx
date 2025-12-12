import { createContext, useContext, useState, useEffect } from 'react';
import api, { getCsrfCookie } from '../api/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await api.get('/user');
            setUser(res.data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        await getCsrfCookie();
        const res = await api.post('/login', { email, password });
        setUser(res.data.user);
        return res.data;
    };

    const register = async (name, email, password) => {
        await getCsrfCookie();
        const res = await api.post('/register', { name, email, password });
        setUser(res.data.user);
        return res.data;
    };

    const logout = async () => {
        await api.post('/logout');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
