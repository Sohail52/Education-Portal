import { useState, useEffect } from 'react';
import api from '../../api/axios';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';

const MaterialList = ({ courseId }) => {
    const [materials, setMaterials] = useState([]);
    const [newMaterial, setNewMaterial] = useState({
        title: '',
        description: '',
        url: '',
        type: 'video'
    });

    useEffect(() => {
        fetchMaterials();
    }, [courseId]);

    const fetchMaterials = async () => {
        try {
            const { data } = await api.get(`/materials/${courseId}`);
            setMaterials(data);
        } catch (error) {
            console.error('Error fetching materials:', error);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/materials', { ...newMaterial, courseId });
            setMaterials([...materials, data]);
            setNewMaterial({ title: '', description: '', url: '', type: 'video' });
        } catch (error) {
            console.error('Error adding material:', error);
            alert('Failed to add material');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this material?')) {
            try {
                await api.delete(`/materials/${id}`);
                setMaterials(materials.filter(m => m._id !== id));
            } catch (error) {
                console.error('Error deleting material:', error);
            }
        }
    };

    return (
        <div className="space-y-8">
            {/* Add Material Form */}
            <Card className="bg-app border-dashed border-2 border-border">
                <h3 className="text-lg font-bold text-primary mb-4">Add New Resource</h3>
                <form onSubmit={handleAdd} className="space-y-4">
                    <Input
                        placeholder="Material Title"
                        value={newMaterial.title}
                        onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                        required
                    />
                    <Input
                        placeholder="Description"
                        value={newMaterial.description}
                        onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                        required
                    />
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="URL (YouTube, PDF, etc.)"
                                type="url"
                                value={newMaterial.url}
                                onChange={(e) => setNewMaterial({ ...newMaterial, url: e.target.value })}
                                required
                            />
                        </div>
                        <div className="w-1/3">
                            <select
                                className="w-full h-full px-4 rounded-xl bg-surface border border-border text-primary focus:ring-2 focus:ring-softBlue-500/20"
                                value={newMaterial.type}
                                onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value })}
                            >
                                <option value="video">Video</option>
                                <option value="document">Document</option>
                                <option value="link">Link</option>
                            </select>
                        </div>
                    </div>
                    <Button type="submit" className="w-full">Add Material</Button>
                </form>
            </Card>

            {/* List of Materials */}
            <div className="space-y-4">
                {materials.map(material => (
                    <div key={material._id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-surface rounded-2xl border border-border hover:shadow-soft transition-all group">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-softBlue-50 flex items-center justify-center text-xl text-softBlue-600">
                                {material.type === 'video' ? '▶️' : material.type === 'document' ? '📄' : '🔗'}
                            </div>
                            <div>
                                <h4 className="font-bold text-primary">{material.title}</h4>
                                <p className="text-sm text-muted mb-1">{material.description}</p>
                                <a
                                    href={material.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-softBlue-500 hover:text-softBlue-700 underline truncate max-w-[200px] inline-block"
                                >
                                    {material.url}
                                </a>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(material._id)}
                            className="mt-4 md:mt-0 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                {materials.length === 0 && (
                    <div className="text-center py-8 text-muted italic">No materials uploaded yet.</div>
                )}
            </div>
        </div>
    );
};

export default MaterialList;
