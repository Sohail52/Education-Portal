import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../api/axios';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        role: 'student'
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const { username, email, password, confirmPassword, mobile, role } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleSelect = (selectedRole) => {
        setFormData({ ...formData, role: selectedRole });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await api.post('/auth/register', {
                username,
                email,
                password,
                mobile,
                role
            });
            login(data);
            if (data.role === 'educator') navigate('/educator');
            else navigate('/student');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto w-full">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary mb-2">Create your account</h1>
                <p className="text-muted">Join our community of learners and educators</p>
            </div>

            <Card className="relative overflow-hidden">
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sage-100 rounded-full blur-3xl opacity-50"></div>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm flex items-center gap-2 border border-red-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                <div className="mb-8">
                    <label className="block text-sm font-medium text-secondary mb-3 text-center">I want to join as a:</label>
                    <div className="grid grid-cols-2 gap-4">
                        <div
                            onClick={() => handleRoleSelect('student')}
                            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center gap-2 ${role === 'student' ? 'border-softBlue-500 bg-softBlue-50' : 'border-cream-200 hover:border-softBlue-200'}`}
                        >
                            <span className="text-2xl">🎓</span>
                            <span className={`font-semibold ${role === 'student' ? 'text-softBlue-600' : 'text-secondary'}`}>Student</span>
                        </div>
                        <div
                            onClick={() => handleRoleSelect('educator')}
                            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center gap-2 ${role === 'educator' ? 'border-sage-500 bg-sage-50' : 'border-cream-200 hover:border-sage-200'}`}
                        >
                            <span className="text-2xl">👩‍🏫</span>
                            <span className={`font-semibold ${role === 'educator' ? 'text-sage-600' : 'text-secondary'}`}>Educator</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Input
                            label="Username"
                            type="text"
                            name="username"
                            value={username}
                            onChange={onChange}
                            placeholder="johndoe"
                            required
                        />
                        <Input
                            label="Mobile Number"
                            type="tel"
                            name="mobile"
                            value={mobile}
                            onChange={onChange}
                            placeholder="+1 234 567 890"
                            required
                        />
                    </div>

                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="you@example.com"
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="••••••••"
                            required
                        />
                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={onChange}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                </form>
            </Card>

            <p className="mt-8 text-center text-sm text-muted">
                Already have an account? <Link to="/login" className="text-softBlue-600 font-semibold hover:underline">Log in</Link>
            </p>
        </div>
    );
};

export default Register;
