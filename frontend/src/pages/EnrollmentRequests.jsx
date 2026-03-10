import { useContext } from 'react';
import NotificationContext from '../context/NotificationContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const EnrollmentRequests = () => {
    const { pendingRequests, loading, handleApprove, handleReject } = useContext(NotificationContext);

    if (loading) {
        return <div className="text-center p-8 text-muted animate-pulse">Loading requests...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Enrollment Requests</h1>
                    <p className="text-muted">Manage student access to your courses</p>
                </div>
                <div className="bg-surface px-4 py-2 rounded-xl border border-border shadow-sm">
                    <span className="text-secondary font-medium">Pending: </span>
                    <span className="text-primary font-bold">{pendingRequests.length}</span>
                </div>
            </div>

            {pendingRequests.length === 0 ? (
                <Card className="text-center py-16 flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-24 h-24 bg-app rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner">
                        ✅
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">All Caught Up!</h3>
                    <p className="text-muted text-lg max-w-md">
                        There are no pending enrollment requests at the moment.
                    </p>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {pendingRequests.map((request) => (
                        <Card
                            key={request._id}
                            className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 hover:border-softBlue-200 transition-colors"
                        >
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-softBlue-100 to-sage-100 flex items-center justify-center text-xl shadow-sm border border-white">
                                    👤
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary text-lg">{request.userId.username}</h3>
                                    <p className="text-sm text-muted">{request.userId.email}</p>
                                </div>
                            </div>

                            <div className="flex-grow w-full md:w-auto border-l-0 md:border-l border-border md:pl-6">
                                <p className="text-xs text-secondary uppercase tracking-wider font-bold mb-1">Requesting Access To</p>
                                <h4 className="font-bold text-primary">{request.courseId.title}</h4>
                                <p className="text-xs text-muted mt-1">
                                    Requested: {new Date(request.enrollmentDate).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="flex gap-3 w-full md:w-auto justify-end">
                                <button
                                    onClick={() => handleReject(request._id)}
                                    className="px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 font-medium transition-colors border border-transparent hover:border-red-100"
                                >
                                    Reject
                                </button>
                                <Button
                                    onClick={() => handleApprove(request._id)}
                                    className="bg-sage-500 hover:bg-sage-600 text-white shadow-soft hover:shadow-lg px-6"
                                >
                                    Approve
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EnrollmentRequests;
