import { useState, useEffect } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';

const CourseForm = ({ initialData = {}, onSubmit, buttonText = 'Submit' }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        level: 'Beginner',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            const formattedData = { ...initialData };
            if (formattedData.startDate) formattedData.startDate = new Date(formattedData.startDate).toISOString().split('T')[0];
            if (formattedData.endDate) formattedData.endDate = new Date(formattedData.endDate).toISOString().split('T')[0];
            setFormData(formattedData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input
                label="Course Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Advanced React Patterns"
                required
            />

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink-600 ml-1">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-cream-300 text-ink-900 focus:outline-none focus:ring-2 focus:ring-softBlue-500/20 focus:border-softBlue-500 transition-all duration-300 placeholder:text-ink-400 shadow-sm hover:shadow-md min-h-[120px] resize-y"
                    placeholder="Briefly describe what students will learn..."
                    required
                ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Development, Design, Business"
                    required
                />

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-ink-600 ml-1">Level</label>
                    <div className="relative">
                        <select
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-cream-300 text-ink-900 focus:outline-none focus:ring-2 focus:ring-softBlue-500/20 focus:border-softBlue-500 transition-all duration-300 shadow-sm hover:shadow-md appearance-none"
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-ink-400">
                            ▼
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Start Date"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="End Date"
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="pt-4 flex justify-end">
                <Button type="submit" className="min-w-[150px]">
                    {buttonText}
                </Button>
            </div>
        </form>
    );
};

export default CourseForm;
