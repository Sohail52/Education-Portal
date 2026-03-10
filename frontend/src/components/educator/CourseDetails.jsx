import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import MaterialList from './MaterialList';
import EnrollmentList from './EnrollmentList';
import Card from '../common/Card';
import Button from '../common/Button';

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await api.get(`/courses/${id}`);
                setCourse(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching course:', error);
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    if (loading) return <div className="p-8 text-center text-ink-400">Loading course details...</div>;
    if (!course) return <div className="p-8 text-center">Course not found</div>;

    return (
        <div className="space-y-8 animate-float">
            {/* Header Card */}
            <Card className="bg-gradient-to-r from-softBlue-50 to-white border-softBlue-100">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-white text-softBlue-600 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm border border-softBlue-100">
                                {course.category}
                            </span>
                            <span className="text-xs text-ink-400 font-medium px-2 py-1 bg-cream-100 rounded-full">{course.level}</span>
                        </div>
                        <h1 className="text-3xl font-bold text-ink-900 mb-2">{course.title}</h1>
                        <p className="text-ink-600 max-w-2xl leading-relaxed">{course.description}</p>
                    </div>
                    <div className="flex flex-col gap-2 min-w-[200px] bg-white/50 p-4 rounded-xl border border-white">
                        <div className="text-sm">
                            <span className="text-ink-400">Start Date:</span>
                            <span className="block font-medium text-ink-900">{new Date(course.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="text-sm">
                            <span className="text-ink-400">End Date:</span>
                            <span className="block font-medium text-ink-900">{new Date(course.endDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Materials Section - Takes up 2/3 space */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold text-ink-900">Course Materials</h2>
                    <MaterialList courseId={id} />
                </div>

                {/* Enrollments Section - Takes up 1/3 space */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-ink-900">Student Enrollments</h2>
                    <EnrollmentList courseId={id} />
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
