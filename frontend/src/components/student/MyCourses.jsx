import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import Card from '../common/Card';
import Button from '../common/Button';
import ProgressContext from '../../context/ProgressContext';

const MyCourses = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getCourseProgress } = useContext(ProgressContext);

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const { data } = await api.get('/enrollments/my-enrollments');
                setEnrollments(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching enrollments:', error);
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, []);

    if (loading) return <div className="p-8 text-center text-muted font-medium">Loading your enrollments...</div>;

    if (enrollments.length === 0) {
        return (
            <Card className="text-center py-12">
                <div className="text-6xl mb-4">🎓</div>
                <h3 className="text-xl font-bold text-primary mb-2">No active enrollments</h3>
                <p className="text-muted mb-6">Browse our catalog to find your next skill.</p>
                <Link to="/student">
                    <Button>Browse Courses</Button>
                </Link>
            </Card>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map(enrollment => {
                const progress = getCourseProgress(enrollment.courseId._id);
                return (
                    <Card
                        key={enrollment._id}
                        hoverEffect
                        className="flex flex-col h-full bg-surface relative overflow-hidden group"
                        progress={progress}
                    >
                        <div className="pt-4 mb-2 flex justify-between items-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${enrollment.status === 'approved' ? 'bg-sage-100 text-sage-600' :
                                    enrollment.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                                        'bg-red-50 text-red-500'
                                }`}>
                                {enrollment.status}
                            </span>
                            <span className="text-xs text-muted">Enrolled: {new Date(enrollment.enrollmentDate).toLocaleDateString()}</span>
                        </div>

                        <h3 className="text-lg font-bold text-primary mb-1">{enrollment.courseId.title}</h3>
                        <p className="text-sm text-muted mb-6 flex-grow">{enrollment.courseId.category}</p>

                        <div className="mt-auto">
                            {enrollment.status === 'approved' || enrollment.status === 'completed' ? (
                                <Link to={`/student/course/${enrollment.courseId._id}`}>
                                    <Button className="w-full py-2 text-sm">Continue Learning</Button>
                                </Link>
                            ) : (
                                <button disabled className="w-full py-2 bg-cream-100 text-muted rounded-xl text-sm font-medium cursor-not-allowed">
                                    Access Locked
                                </button>
                            )}
                        </div>
                    </Card>
                );
            })}
        </div>
    );
};

export default MyCourses;
