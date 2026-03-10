import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProgressContext from '../../context/ProgressContext';
import Card from '../common/Card';
import Button from '../common/Button';

const ContinueLearningCard = () => {
    const { lastActive } = useContext(ProgressContext);

    // Gracefully hide if no history exists
    if (!lastActive) return null;

    return (
        <Card className="mb-8 border-l-4 border-l-softBlue-500 bg-surface/80 backdrop-blur-sm animate-fade-in-up">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-sm font-bold text-muted uppercase tracking-wider mb-1">Continue Learning</h2>
                    <h3 className="text-xl font-bold text-primary">{lastActive.courseTitle}</h3>
                    <p className="text-sm text-secondary line-clamp-1 mt-1">
                        Last viewed: <span className="font-medium text-primary">{lastActive.materialTitle || 'Course Content'}</span>
                    </p>
                </div>

                <Link to={`/student/course/${lastActive.courseId}`}>
                    <Button className="whitespace-nowrap px-6 shadow-soft hover:shadow-md transition-shadow">
                        Resume
                        <span className="ml-2 text-xs opacity-70">
                            ({new Date(lastActive.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                        </span>
                    </Button>
                </Link>
            </div>
        </Card>
    );
};

export default ContinueLearningCard;
