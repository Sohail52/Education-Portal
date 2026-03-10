import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import Card from '../common/Card';
import Button from '../common/Button';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const { data } = await api.get('/courses/my-courses');
            setCourses(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault(); // Prevent link navigation if inside a link
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await api.delete(`/courses/${id}`);
                setCourses(courses.filter(course => course._id !== id));
            } catch (error) {
                console.error('Error deleting course:', error);
                alert('Failed to delete course');
            }
        }
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-64 bg-gray-100 rounded-3xl animate-pulse"></div>
                ))}
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <Card className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-primary mb-2">No courses yet</h3>
                <p className="text-muted mb-6">Start your teaching journey by creating your first course.</p>
                <Link to="/educator/create-course">
                    <Button>Create Course</Button>
                </Link>
            </Card>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
                <Link key={course._id} to={`/educator/course/${course._id}`}>
                    <Card hoverEffect className="h-full flex flex-col relative group">
                        {/* Course visual placeholder */}
                        <div className="h-40 bg-app rounded-2xl mb-4 flex items-center justify-center text-4xl group-hover:bg-softBlue-50 transition-colors duration-300">
                            {course.category === 'Development' ? '💻' : course.category === 'Design' ? '🎨' : '🎓'}
                        </div>

                        <div className="flex items-start justify-between mb-2">
                            <span className="px-3 py-1 bg-softBlue-50 text-softBlue-600 text-xs font-bold uppercase tracking-wider rounded-full">
                                {course.category}
                            </span>
                            <span className="text-xs text-muted font-medium">{course.level}</span>
                        </div>

                        <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2">{course.title}</h3>
                        <p className="text-muted text-sm line-clamp-2 mb-4 flex-grow">{course.description}</p>

                        <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
                            <span className="text-sm font-medium text-secondary group-hover:text-softBlue-600 transition-colors">Manage Course →</span>
                            <div className="flex gap-2">
                                <Link to={`/educator/edit-course/${course._id}`} onClick={(e) => e.stopPropagation()}>
                                    <button className="p-2 text-muted hover:text-primary hover:bg-app rounded-full transition-colors" title="Edit">
                                        ✎
                                    </button>
                                </Link>
                                <button
                                    onClick={(e) => handleDelete(e, course._id)}
                                    className="p-2 text-muted hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                    title="Delete"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    );
};

export default CourseList;
