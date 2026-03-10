import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import ScrollAnimation from '../components/common/ScrollAnimation';

const Home = () => {
    return (
        <div className="space-y-32 pb-20">
            {/* Hero Section */}
            <section className="relative text-center space-y-8 pt-20">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-softBlue-100/40 rounded-full blur-[120px] -z-10 pointer-events-none animate-subtle-zoom"></div>

                <ScrollAnimation>
                    <div className="inline-block px-4 py-1.5 rounded-full bg-surface/80 backdrop-blur-sm border border-cream-200 text-sm font-medium text-secondary mb-6 shadow-sm">
                        ✨ Reimagining Education for Everyone
                    </div>
                </ScrollAnimation>

                <ScrollAnimation className="delay-100">
                    <h1 className="text-5xl md:text-7xl font-bold text-primary tracking-tight leading-[1.1] max-w-5xl mx-auto">
                        Master new skills with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-softBlue-600 to-sage-500">
                            Education Hub
                        </span>
                    </h1>
                </ScrollAnimation>

                <ScrollAnimation className="delay-200">
                    <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                        A premium learning experience designed for focus and clarity. Connect with expert educators and advance your career today.
                    </p>
                </ScrollAnimation>

                <ScrollAnimation className="delay-300">
                    <div className="flex items-center justify-center gap-4 pt-4">
                        <Link to="/register">
                            <Button className="px-8 py-4 text-lg shadow-glow hover:shadow-lg">Start Learning Now</Button>
                        </Link>
                        <Link to="/student">
                            <Button variant="secondary" className="px-8 py-4 text-lg bg-surface/80 backdrop-blur-sm">Explore Courses</Button>
                        </Link>
                    </div>
                </ScrollAnimation>

                {/* Stat Cards - Floating */}
                <ScrollAnimation className="delay-500">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-20">
                        {[
                            { label: 'Active Students', value: '10k+' },
                            { label: 'Expert Courses', value: '500+' },
                            { label: 'Instructors', value: '120+' },
                            { label: 'Satisfaction', value: '4.9/5' }
                        ].map((stat, idx) => (
                            <Card key={idx} className="text-center py-8 bg-surface/60 backdrop-blur-md border-surface shadow-lg" hoverEffect>
                                <h3 className="text-4xl font-bold text-primary mb-2">{stat.value}</h3>
                                <p className="text-xs text-muted uppercase tracking-widest font-bold">{stat.label}</p>
                            </Card>
                        ))}
                    </div>
                </ScrollAnimation>
            </section>

            {/* Why EduHub Section */}
            <section className="max-w-7xl mx-auto px-4">
                <ScrollAnimation>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Why choose EduHub?</h2>
                        <p className="text-muted text-lg max-w-2xl mx-auto">We focus on providing the best learning experience with features designed for your success.</p>
                    </div>
                </ScrollAnimation>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: '🚀', title: 'Learn at your pace', desc: 'Access high-quality content anytime, anywhere. Your journey, your schedule.' },
                        { icon: '🌱', title: 'Grow with experts', desc: 'Direct feedback from industry professionals to help you master complex topics.' },
                        { icon: '🤝', title: 'Community First', desc: 'Join a vibrant community of learners. Share features, discuss ideas, and grow together.' }
                    ].map((feature, idx) => (
                        <ScrollAnimation key={idx} className={`delay-${idx * 100}`}>
                            <Card className="h-full p-8 border-none shadow-soft hover:shadow-float transition-all duration-500 bg-surface" hoverEffect>
                                <div className="w-16 h-16 bg-app rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-3">{feature.title}</h3>
                                <p className="text-muted leading-relaxed">{feature.desc}</p>
                            </Card>
                        </ScrollAnimation>
                    ))}
                </div>
            </section>

            {/* Popular Courses Preview (Mock) */}
            <section className="bg-surface py-24 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-sage-50 rounded-full blur-3xl -z-10 opacity-50"></div>
                <div className="max-w-7xl mx-auto">
                    <ScrollAnimation>
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">Popular Courses</h2>
                                <p className="text-muted">Explore our highest-rated content</p>
                            </div>
                            <Link to="/student">
                                <Button variant="secondary">View All Courses →</Button>
                            </Link>
                        </div>
                    </ScrollAnimation>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Advanced React Patterns', category: 'Development', level: 'Advanced' },
                            { title: 'UI/UX Design Masterclass', category: 'Design', level: 'Intermediate' },
                            { title: 'Digital Marketing 101', category: 'Business', level: 'Beginner' }
                        ].map((course, idx) => (
                            <ScrollAnimation key={idx} className={`delay-${idx * 100}`}>
                                <Card hoverEffect className="h-full flex flex-col group cursor-pointer border-cream-200">
                                    <div className="h-48 bg-cream-50 rounded-2xl mb-6 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-500 shadow-inner">
                                        {course.category === 'Development' ? '💻' : course.category === 'Design' ? '🎨' : '📈'}
                                    </div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="px-3 py-1 bg-softBlue-50 text-softBlue-600 text-xs font-bold uppercase tracking-wider rounded-full">
                                            {course.category}
                                        </span>
                                        <span className="text-xs text-muted font-medium">{course.level}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-softBlue-600 transition-colors">{course.title}</h3>
                                    <p className="text-muted text-sm mb-6">Learn the fundamentals and advanced concepts in this comprehensive guide.</p>
                                    <div className="mt-auto pt-4 border-t border-cream-100 text-sm font-bold text-primary">
                                        Free Preview Available
                                    </div>
                                </Card>
                            </ScrollAnimation>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="max-w-6xl mx-auto px-4">
                <ScrollAnimation>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Loved by Students</h2>
                        <p className="text-muted text-lg">Don't just take our word for it.</p>
                    </div>
                </ScrollAnimation>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { text: "EduHub transformed the way I learn. The platform is beautiful and the courses are top-notch.", author: "Sarah J.", role: "Product Designer" },
                        { text: "Finally, a learning platform that doesn't feel cluttered. I can actually focus on the content.", author: "Michael C.", role: "Frontend Dev" }
                    ].map((testimonial, idx) => (
                        <ScrollAnimation key={idx} className={`delay-${idx * 100}`}>
                            <Card className="p-8 bg-app border-none shadow-sm h-full">
                                <div className="text-softBlue-500 text-4xl font-serif mb-4">"</div>
                                <p className="text-lg text-secondary italic mb-6">{testimonial.text}</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-cream-200"></div>
                                    <div>
                                        <p className="font-bold text-primary">{testimonial.author}</p>
                                        <p className="text-xs text-muted uppercase tracking-widest">{testimonial.role}</p>
                                    </div>
                                </div>
                            </Card>
                        </ScrollAnimation>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative my-20 mx-4">
                <ScrollAnimation>
                    <div className="bg-ink-900 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-softBlue-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sage-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold text-surface mb-6">Ready to start your journey?</h2>
                            <p className="text-muted text-lg max-w-2xl mx-auto mb-10">Join thousands of students and instructors on the most premium learning platform today.</p>
                            <Link to="/register">
                                <Button className="px-10 py-4 text-lg bg-surface text-primary hover:bg-cream-100 hover:text-primary shadow-glow">
                                    Get Started for Free
                                </Button>
                            </Link>
                        </div>
                    </div>
                </ScrollAnimation>
            </section>
        </div>
    );
};

export default Home;
