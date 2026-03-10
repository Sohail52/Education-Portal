const express = require('express');
const router = express.Router();
const {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    getMyCourses
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(getCourses)
    .post(protect, authorize('educator', 'admin'), createCourse);

router.route('/my-courses')
    .get(protect, authorize('educator', 'admin'), getMyCourses);

router.route('/:id')
    .get(getCourseById)
    .put(protect, authorize('educator', 'admin'), updateCourse)
    .delete(protect, authorize('educator', 'admin'), deleteCourse);

module.exports = router;
