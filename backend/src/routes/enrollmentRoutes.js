const express = require('express');
const router = express.Router();
const {
    enrollInCourse,
    getMyEnrollments,
    getCourseEnrollments,
    updateEnrollmentStatus,
    getPendingEnrollments
} = require('../controllers/enrollmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('student'), enrollInCourse);
router.get('/my-enrollments', protect, authorize('student'), getMyEnrollments);
router.get('/pending', protect, authorize('educator'), getPendingEnrollments);
router.get('/course/:courseId', protect, authorize('educator'), getCourseEnrollments);
router.put('/:id', protect, authorize('educator'), updateEnrollmentStatus);

module.exports = router;
