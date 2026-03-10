import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EducatorDashboard from './pages/EducatorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import EnrollmentRequests from './pages/EnrollmentRequests';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import LayoutContext from './context/LayoutContext';

const PrivateRoute = ({ children, role }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    if (!user) return <Navigate to="/login" />;

    if (role && user.role !== role) return <Navigate to="/" />;

    return children;
};

function App() {
    const { isFocusMode } = useContext(LayoutContext);

    return (
        <div className={`min-h-screen bg-app font-sans text-secondary selection:bg-softBlue-100 selection:text-softBlue-600 transition-colors duration-500 ${isFocusMode ? 'focus-mode' : ''}`}>
            <Navbar />
            <div className={`
                transition-all duration-700 ease-in-out
                ${isFocusMode ? 'pt-8 max-w-full px-12' : 'pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'}
            `}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route
                        path="/educator/*"
                        element={
                            <PrivateRoute role="educator">
                                <EducatorDashboard />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/educator/requests"
                        element={
                            <PrivateRoute role="educator">
                                <EnrollmentRequests />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/student/*"
                        element={
                            <PrivateRoute role="student">
                                <StudentDashboard />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
