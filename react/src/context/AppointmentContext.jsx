import { createContext, useContext, useState } from 'react';
import api from '../api/api';

const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        const res = await api.get('/appointments');
        setAppointments(res.data);
    };

    const createAppointment = async (date, time) => {
        const res = await api.post('/appointments', { date, time });
        setAppointments([...appointments, res.data.appointment]);
        return res.data;
    };

    const cancelAppointment = async (id) => {
        await api.delete(`/appointments/${id}`);
        setAppointments(appointments.filter(a => a.id !== id));
    };

    const fetchAllAppointments = async () => {
        const res = await api.get('/admin/appointments');
        setAppointments(res.data);
    };

    const updateStatus = async (id, status) => {
        const res = await api.patch(`/admin/appointments/${id}`, { status });
        setAppointments(appointments.map(a => a.id === id ? res.data.appointment : a));
    };

    const clearAppointments = () => {
        setAppointments([]);
    };

    return (
        <AppointmentContext.Provider value={{
            appointments,
            fetchAppointments,
            createAppointment,
            cancelAppointment,
            fetchAllAppointments,
            updateStatus,
            clearAppointments
        }}>
            {children}
        </AppointmentContext.Provider>
    );
}

export const useAppointments = () => useContext(AppointmentContext);
