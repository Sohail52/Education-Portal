import { useState, useEffect } from 'react';
import api from '../../api/axios';

const EnrollmentList = ({ courseId }) => {
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        fetchEnrollments();
    }, [courseId]);

    const fetchEnrollments = async () => {
        try {
            const { data } = await api.get(`/enrollments/course/${courseId}`);
            setEnrollments(data);
        } catch (error) {
            console.error('Error fetching enrollments:', error);
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            const { data } = await api.put(`/enrollments/${id}`, { status });
            setEnrollments(enrollments.map(e => e._id === id ? data : e));
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    if (enrollments.length === 0) {
        return <div className="p-6 bg-cream-50 rounded-2xl text-center text-ink-400 text-sm">No enrollments yet.</div>;
    }

    return (
        <div className="space-y-3">
            {enrollments.map(enrollment => (
                <div key={enrollment._id} className="bg-white p-4 rounded-2xl border border-cream-200 shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-ink-900 text-sm">{enrollment.userId?.username || 'Unknown Student'}</p>
                            <p className="text-xs text-ink-400">{enrollment.userId?.email}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${enrollment.status === 'approved' ? 'bg-sage-100 text-sage-600' :
                                enrollment.status === 'rejected' ? 'bg-red-100 text-red-600' :
                                    'bg-yellow-100 text-yellow-600'
                            }`}>
                            {enrollment.status}
                        </span>
                    </div>

                    <div className="flex gap-2 mt-1">
                        {enrollment.status === 'pending' && (
                            <>
                                <button
                                    onClick={() => handleStatusChange(enrollment._id, 'approved')}
                                    className="flex-1 py-1.5 bg-sage-50 text-sage-600 hover:bg-sage-100 rounded-lg text-xs font-bold transition-colors"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleStatusChange(enrollment._id, 'rejected')}
                                    className="flex-1 py-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg text-xs font-bold transition-colors"
                                >
                                    Reject
                                </button>
                            </>
                        )}
                        {enrollment.status === 'approved' && (
                            <button
                                onClick={() => handleStatusChange(enrollment._id, 'rejected')}
                                className="flex-1 py-1.5 text-red-400 hover:text-red-500 text-xs font-bold transition-colors"
                            >
                                Revoke Access
                            </button>
                        )}
                        {enrollment.status === 'rejected' && (
                            <button
                                onClick={() => handleStatusChange(enrollment._id, 'approved')}
                                className="flex-1 py-1.5 text-sage-500 hover:text-sage-600 text-xs font-bold transition-colors"
                            >
                                Re-approve
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EnrollmentList;
