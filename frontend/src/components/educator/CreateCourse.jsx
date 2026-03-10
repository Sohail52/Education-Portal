import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import CourseForm from './CourseForm';
import Card from '../common/Card';

const CreateCourse = () => {
    const navigate = useNavigate();

    const handleCreate = async (formData) => {
        try {
            await api.post('/courses', formData);
            navigate('/educator');
        } catch (error) {
            console.error('Error creating course:', error);
            alert('Failed to create course');
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-ink-900 mb-6">Create New Course</h2>
            <Card>
                <CourseForm onSubmit={handleCreate} buttonText="Create Course" />
            </Card>
        </div>
    );
};

export default CreateCourse;
