import { useState, useEffect } from 'react';
import api from '../../api/axios';
import Card from '../common/Card';
import Button from '../common/Button';

const AvailableCourses = () => {
    const [courses, setCourses] = useState([]);
    const [myEnrollments, setMyEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkEnrollmentsAndFetchCourses = async () => {
            try {
                let enrollments = [];
                try {
                    const { data } = await api.get('/enrollments/my-enrollments');
                    enrollments = data;
                    setMyEnrollments(data);
                } catch (err) {
                    // Ignore
                }

                const { data: coursesData } = await api.get('/courses');
                setCourses(coursesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setLoading(false);
            }
        };

        checkEnrollmentsAndFetchCourses();
    }, []);

    const handleEnroll = async (courseId) => {
        try {
            await api.post('/enrollments', { courseId });
            alert('Enrollment requested successfully!');
            const { data } = await api.get('/enrollments/my-enrollments');
            setMyEnrollments(data);
        } catch (error) {
            console.error('Error enrolling:', error);
            alert(error.response?.data?.message || 'Enrollment failed');
        }
    };

    const getEnrollmentStatus = (courseId) => {
        const enrollment = myEnrollments.find(e => e.courseId === courseId || e.courseId._id === courseId);
        return enrollment ? enrollment.status : null;
    };

    if (loading) return <div className="text-center p-8 text-muted">Loading courses...</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => {
                const status = getEnrollmentStatus(course._id);
                return (
                    <Card key={course._id} hoverEffect className="flex flex-col h-full group">
                        <div className="h-40 bg-softBlue-50 rounded-2xl mb-4 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-500">
                            {course.category === 'Development' ? '💻' : course.category === 'Design' ? '🎨' : '🎓'}
                        </div>

                        <div className="flex items-start justify-between mb-2">
                            <span className="px-3 py-1 bg-app text-secondary text-xs font-bold uppercase tracking-wider rounded-full">
                                {course.category}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2">{course.title}</h3>
                        <p className="text-muted text-sm line-clamp-3 mb-6 flex-grow">{course.description}</p>

                        <div className="mt-auto pt-4 border-t border-cream-100">
                            {status ? (
                                <button disabled className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wide cursor-not-allowed ${status === 'approved' ? 'bg-sage-100 text-sage-600' :
                                    status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                                        'bg-red-50 text-red-500'
                                    }`}>
                                    {status === 'approved' ? '✓ Enrolled' : `Status: ${status}`}
                                </button>
                            ) : (
                                <Button onClick={() => handleEnroll(course._id)} className="w-full">
                                    Enroll Now
                                </Button>
                            )}
                        </div>
                    </Card>
                );
            })}
        </div>
    );
};

export default AvailableCourses;
