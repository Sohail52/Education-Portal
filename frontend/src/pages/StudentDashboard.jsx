import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AvailableCourses from '../components/student/AvailableCourses';
import MyCourses from '../components/student/MyCourses';
import StudentCourseDetails from '../components/student/StudentCourseDetails';
import ContinueLearningCard from '../components/student/ContinueLearningCard';

const StudentDashboard = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Student Dashboard</h1>
                    <p className="text-muted">Continue your learning journey</p>
                </div>
            </div>

            <ContinueLearningCard />

            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-cream-200">
                <Link to="/student">
                    <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${isActive('/student') ? 'bg-border text-primary' : 'text-muted hover:text-ink-600 hover:bg-app'}`}>
                        Browse Courses
                    </button>
                </Link>
                <Link to="/student/my-courses">
                    <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${isActive('/student/my-courses') ? 'bg-border text-primary' : 'text-muted hover:text-ink-600 hover:bg-app'}`}>
                        My Enrollments
                    </button>
                </Link>
            </div>

            <div className="min-h-[500px]">
                <Routes>
                    <Route path="/" element={<AvailableCourses />} />
                    <Route path="/my-courses" element={<MyCourses />} />
                    <Route path="/course/:id" element={<StudentCourseDetails />} />
                </Routes>
            </div>
        </div>
    );
};

export default StudentDashboard;
