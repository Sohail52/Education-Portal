const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({}).populate('educatorId', 'username email');
        res.json(courses);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id).populate('educatorId', 'username email');

        if (course) {
            res.json(course);
        } else {
            res.status(404);
            throw new Error('Course not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Educator
const createCourse = async (req, res, next) => {
    try {
        const { title, description, category, level, startDate, endDate } = req.body;

        const course = new Course({
            title,
            description,
            category,
            level,
            startDate,
            endDate,
            educatorId: req.user._id
        });

        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Educator
const updateCourse = async (req, res, next) => {
    try {
        const { title, description, category, level, startDate, endDate } = req.body;

        const course = await Course.findById(req.params.id);

        if (course) {
            if (course.educatorId.toString() !== req.user._id.toString()) {
                res.status(401);
                throw new Error('Not authorized to update this course');
            }

            course.title = title || course.title;
            course.description = description || course.description;
            course.category = category || course.category;
            course.level = level || course.level;
            course.startDate = startDate || course.startDate;
            course.endDate = endDate || course.endDate;

            const updatedCourse = await course.save();
            res.json(updatedCourse);
        } else {
            res.status(404);
            throw new Error('Course not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Educator
const deleteCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            if (course.educatorId.toString() !== req.user._id.toString()) {
                res.status(401);
                throw new Error('Not authorized to delete this course');
            }

            // Using findByIdAndDelete because .remove() is deprecated in newer Mongoose
            await Course.findByIdAndDelete(req.params.id);
            res.json({ message: 'Course removed' });
        } else {
            res.status(404);
            throw new Error('Course not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get educator's courses
// @route   GET /api/courses/my-courses
// @access  Private/Educator
const getMyCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({ educatorId: req.user._id });
        res.json(courses);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    getMyCourses
};
