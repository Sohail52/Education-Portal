const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Enroll in a course
// @route   POST /api/enrollments
// @access  Private/Student
const enrollInCourse = async (req, res, next) => {
    try {
        const { courseId } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            res.status(404);
            throw new Error('Course not found');
        }

        const existingEnrollment = await Enrollment.findOne({
            userId: req.user._id,
            courseId
        });

        if (existingEnrollment) {
            res.status(400);
            throw new Error('Already enrolled in this course');
        }

        const enrollment = await Enrollment.create({
            userId: req.user._id,
            courseId,
            status: 'pending' // Default status
        });

        res.status(201).json(enrollment);
    } catch (error) {
        next(error);
    }
};

// @desc    Get my enrollments
// @route   GET /api/enrollments/my-enrollments
// @access  Private/Student
const getMyEnrollments = async (req, res, next) => {
    try {
        const enrollments = await Enrollment.find({ userId: req.user._id })
            .populate('courseId', 'title description startDate endDate educatorId')
            .populate({
                path: 'courseId',
                populate: {
                    path: 'educatorId',
                    select: 'username email'
                }
            });
        res.json(enrollments);
    } catch (error) {
        next(error);
    }
};

// @desc    Get enrollments for a course
// @route   GET /api/enrollments/course/:courseId
// @access  Private/Educator
const getCourseEnrollments = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            res.status(404);
            throw new Error('Course not found');
        }

        if (course.educatorId.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to view enrollments for this course');
        }

        const enrollments = await Enrollment.find({ courseId: req.params.courseId })
            .populate('userId', 'username email');

        res.json(enrollments);
    } catch (error) {
        next(error);
    }
};

// @desc    Update enrollment status
// @route   PUT /api/enrollments/:id
// @access  Private/Educator
const updateEnrollmentStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const enrollment = await Enrollment.findById(req.params.id).populate('courseId');

        if (!enrollment) {
            res.status(404);
            throw new Error('Enrollment not found');
        }

        if (enrollment.courseId.educatorId.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to update this enrollment');
        }

        enrollment.status = status;
        await enrollment.save();

        res.json(enrollment);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all pending enrollments for an educator
// @route   GET /api/enrollments/pending
// @access  Private/Educator
const getPendingEnrollments = async (req, res, next) => {
    try {
        // Find all courses taught by the educator
        const courses = await Course.find({ educatorId: req.user._id });
        const courseIds = courses.map(course => course._id);

        // Find pending enrollments for these courses
        const enrollments = await Enrollment.find({
            courseId: { $in: courseIds },
            status: 'pending'
        })
            .populate('courseId', 'title')
            .populate('userId', 'username email');

        res.json(enrollments);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    enrollInCourse,
    getMyEnrollments,
    getCourseEnrollments,
    updateEnrollmentStatus,
    getPendingEnrollments
};
