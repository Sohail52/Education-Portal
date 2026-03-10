import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';
import Card from '../common/Card';
import ProgressContext from '../../context/ProgressContext';

const StudentCourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { trackActivity } = useContext(ProgressContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const courseRes = await api.get(`/courses/${id}`);
                setCourse(courseRes.data);

                try {
                    const materialsRes = await api.get(`/materials/${id}`);
                    setMaterials(materialsRes.data);
                } catch (err) {
                    console.error('Error fetching materials:', err);
                    if (err.response && err.response.status === 401) {
                        setError('You are not authorized to view materials for this course yet.');
                    }
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching course:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleMaterialClick = (material) => {
        trackActivity(course._id, course.title, material._id, material.title, materials.length);
    };

    if (loading) return <div className="text-center p-8 text-muted">Loading learning materials...</div>;
    if (!course) return <div className="text-center p-8 text-muted">Course not found</div>;

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Course Header */}
            <Card className="bg-gradient-to-br from-indigo-900 to-softBlue-900 text-white border-none shadow-glow">
                <div className="p-4">
                    <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-sm">
                        {course.category}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2">{course.title}</h1>
                    <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">{course.description}</p>

                    <div className="flex gap-6 mt-8 text-sm text-blue-200">
                        <div className="flex items-center gap-2">
                            <span>👨‍🏫</span>
                            <span>{course.educatorId?.username}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>📊</span>
                            <span>{course.level}</span>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Content Section */}
            <div>
                <h2 className="text-2xl font-bold text-primary mb-6">Learning Materials</h2>

                {error ? (
                    <Card className="bg-red-50 border-red-100 text-red-600 p-6 flex items-center gap-3">
                        <span className="text-2xl">🔒</span>
                        <div>
                            <p className="font-bold">Access Restricted</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {materials.map(material => (
                            <a
                                key={material._id}
                                href={material.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group"
                                onClick={() => handleMaterialClick(material)}
                            >
                                <div className="bg-surface p-5 rounded-2xl border border-border shadow-sm hover:shadow-float hover:border-softBlue-200 transition-all duration-300 flex items-center gap-5">
                                    <div className={`
                                        w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner
                                        ${material.type === 'video' ? 'bg-red-50 text-red-500' :
                                            material.type === 'document' ? 'bg-blue-50 text-blue-500' :
                                                'bg-purple-50 text-purple-500'}
                                    `}>
                                        {material.type === 'video' ? '▶️' : material.type === 'document' ? '📄' : '🔗'}
                                    </div>

                                    <div className="flex-grow">
                                        <h3 className="font-bold text-primary text-lg group-hover:text-softBlue-600 transition-colors">
                                            {material.title}
                                        </h3>
                                        <p className="text-muted text-sm">{material.description}</p>
                                    </div>

                                    <div className="w-8 h-8 rounded-full bg-app flex items-center justify-center text-muted group-hover:bg-softBlue-500 group-hover:text-white transition-all">
                                        →
                                    </div>
                                </div>
                            </a>
                        ))}
                        {materials.length === 0 && (
                            <div className="text-center py-12 bg-app rounded-3xl border border-border border-dashed">
                                <p className="text-muted italic">No learning materials have been uploaded for this course yet.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentCourseDetails;
