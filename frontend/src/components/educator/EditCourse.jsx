import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import CourseForm from './CourseForm';
import Card from '../common/Card';

const EditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await api.get(`/courses/${id}`);
                setInitialData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching course:', error);
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    const handleUpdate = async (formData) => {
        try {
            await api.put(`/courses/${id}`, formData);
            navigate('/educator');
        } catch (error) {
            console.error('Error updating course:', error);
            alert('Failed to update course');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!initialData) return <div>Course not found</div>;

    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-ink-900 mb-6">Edit Course</h2>
            <Card>
                <CourseForm
                    initialData={initialData}
                    onSubmit={handleUpdate}
                    buttonText="Update Course"
                />
            </Card>
        </div>
    );
};

export default EditCourse;
