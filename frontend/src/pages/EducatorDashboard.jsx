import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import CourseList from '../components/educator/CourseList';
import CreateCourse from '../components/educator/CreateCourse';
import EditCourse from '../components/educator/EditCourse';
import CourseDetails from '../components/educator/CourseDetails';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const EducatorDashboard = () => {
    const location = useLocation();

    // Quick helper to determine active tab
    const isActive = (path) => location.pathname === path;

    return (
        <div className="space-y-8">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Educator Dashboard</h1>
                    <p className="text-muted">Manage your courses and track student progress</p>
                </div>
                <Link to="/educator/create-course">
                    <Button>+ Create New Course</Button>
                </Link>
            </div>

            {/* Dashboard Navigation Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-cream-200">
                <Link to="/educator">
                    <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${isActive('/educator') ? 'bg-border text-primary' : 'text-muted hover:text-ink-600 hover:bg-app'}`}>
                        My Courses
                    </button>
                </Link>
                {/* Future tabs like "Analytics", "Earnings" could go here */}
            </div>

            {/* Main Content Area */}
            <div className="min-h-[500px]">
                <Routes>
                    <Route path="/" element={<CourseList />} />
                    <Route path="/create-course" element={<CreateCourse />} />
                    <Route path="/edit-course/:id" element={<EditCourse />} />
                    <Route path="/course/:id" element={<CourseDetails />} />
                </Routes>
            </div>
        </div>
    );
};

export default EducatorDashboard;
