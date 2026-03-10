import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import AuthContext from './AuthContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPendingRequests = async () => {
        if (user?.role !== 'educator') return;

        try {
            setLoading(true);
            const { data } = await api.get('/enrollments/pending');
            setPendingRequests(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pending requests:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.role === 'educator') {
            fetchPendingRequests();
            // Poll every 30 seconds for updates
            const interval = setInterval(fetchPendingRequests, 30000);
            return () => clearInterval(interval);
        } else {
            setPendingRequests([]);
        }
    }, [user]);

    const handleApprove = async (id) => {
        try {
            await api.put(`/enrollments/${id}`, { status: 'approved' });
            setPendingRequests(prev => prev.filter(req => req._id !== id));
            return true;
        } catch (error) {
            console.error('Error approving request:', error);
            return false;
        }
    };

    const handleReject = async (id) => {
        try {
            await api.put(`/enrollments/${id}`, { status: 'rejected' });
            setPendingRequests(prev => prev.filter(req => req._id !== id));
            return true;
        } catch (error) {
            console.error('Error rejecting request:', error);
            return false;
        }
    };

    return (
        <NotificationContext.Provider value={{
            pendingRequests,
            pendingCount: pendingRequests.length,
            loading,
            fetchPendingRequests,
            handleApprove,
            handleReject
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;
