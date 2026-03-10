const express = require('express');
const router = express.Router();
const {
    addMaterial,
    getMaterials,
    updateMaterial,
    deleteMaterial
} = require('../controllers/materialController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('educator'), addMaterial);
router.get('/:courseId', protect, getMaterials);
router.put('/:id', protect, authorize('educator'), updateMaterial);
router.delete('/:id', protect, authorize('educator'), deleteMaterial);

module.exports = router;
