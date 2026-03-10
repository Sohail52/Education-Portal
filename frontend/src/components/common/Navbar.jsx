import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import ThemeContext from '../../context/ThemeContext';
import LayoutContext from '../../context/LayoutContext';
import NotificationContext from '../../context/NotificationContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { themeIndex, toggleTheme } = useContext(ThemeContext);
    const { isFocusMode, toggleFocusMode } = useContext(LayoutContext);
    const { pendingCount } = useContext(NotificationContext);
    const navigate = useNavigate();
    const location = useLocation();

    if (isFocusMode) return null;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname.startsWith(path);

    const NavItem = ({ to, label }) => (
        <Link
            to={to}
            className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${isActive(to)
                    ? 'bg-primary text-surface shadow-lg transform scale-105'
                    : 'text-secondary hover:bg-cream-200 hover:text-primary'}
            `}
        >
            {label}
        </Link>
    );

    // Icons for themes: 0=Warm (Sun), 1=Dark (Moon), 2=Pastel (Palette)
    const ThemeIcon = () => {
        if (themeIndex === 0) return <span>☀️</span>;
        if (themeIndex === 1) return <span>🌙</span>;
        return <span>🎨</span>;
    };

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <nav className="bg-surface/80 backdrop-blur-md border border-white/40 shadow-float rounded-full px-6 py-3 flex items-center justify-between gap-8 max-w-5xl w-full transition-colors duration-500">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-softBlue-500 to-sage-500 flex items-center justify-center text-white font-bold text-xs group-hover:rotate-12 transition-transform duration-500 shadow-glow">
                        EH
                    </div>
                    <span className="font-bold text-primary text-lg tracking-tight transition-colors duration-500">EduHub</span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-2 bg-app/50 p-1 rounded-full transition-colors duration-500">
                    {!user && (
                        <>
                            <NavItem to="/login" label="Login" />
                            <NavItem to="/register" label="Get Started" />
                        </>
                    )}

                    {user?.role === 'educator' && (
                        <>
                            <NavItem to="/educator" label="Dashboard" />
                            <NavItem to="/educator/create-course" label="Create" />
                        </>
                    )}

                    {user?.role === 'student' && (
                        <>
                            <NavItem to="/student" label="Browse" />
                            <NavItem to="/student/my-courses" label="My Learning" />
                        </>
                    )}
                </div>

                {/* Right Side: Theme Toggle & User Profile */}
                <div className="flex items-center gap-4">
                    {/* Focus Mode Toggle */}
                    <button
                        onClick={toggleFocusMode}
                        className="w-10 h-10 rounded-full bg-app flex items-center justify-center text-xl hover:scale-110 transition-transform duration-300 shadow-sm border border-border text-muted hover:text-primary"
                        title="Enter Focus Mode"
                    >
                        <span>👁️</span>
                    </button>

                    {/* Notification Bell (Educator/Admin Only) */}
                    {(user?.role === 'educator' || user?.role === 'admin') && (
                        <Link to="/educator/requests" className="relative">
                            <button
                                className="w-10 h-10 rounded-full bg-app flex items-center justify-center text-xl hover:scale-110 transition-transform duration-300 shadow-sm border border-border text-muted hover:text-primary"
                                title="Enrollment Requests"
                            >
                                <span>🔔</span>
                            </button>
                            {pendingCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-primary text-[10px] font-bold text-white ring-2 ring-white animate-pulse">
                                    {pendingCount}
                                </span>
                            )}
                        </Link>
                    )}

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-full bg-app flex items-center justify-center text-xl hover:scale-110 transition-transform duration-300 shadow-sm border border-border"
                        title="Toggle Theme"
                    >
                        <ThemeIcon />
                    </button>

                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:block text-right">
                                <p className="text-xs font-bold text-primary transition-colors duration-500">{user.username}</p>
                                <p className="text-[10px] uppercase tracking-wider text-muted transition-colors duration-500">{user.role}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-cream-200 border-2 border-surface shadow-sm overflow-hidden">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${user.username}&background=random`}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-8 h-8 rounded-full bg-app flex items-center justify-center text-muted hover:bg-red-50 hover:text-red-500 transition-colors"
                                title="Logout"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            </button>
                        </div>
                    ) : (
                        null
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
